<?php

declare(strict_types=1);

namespace PortfolioExample\SkillBuilderShopwareImport;

final class ShopwareDemoProductImporter
{
    private const PRODUCT_PREFIX = 'SB-COURSE-';
    private const ROOT_CATEGORY = 'SkillBuilder Kurse';
    private const MANUFACTURER = 'SkillBuilder';

    private ?string $accessToken = null;

    /**
     * @param list<array{
     *     id:int,
     *     title:string,
     *     description:string
     * }> $lessons
     * @return array{created:int, updated:int, skipped:int, deactivated:int, obsoleteChildCategoriesHidden:int}
     */
    public function importLessons(array $lessons): array
    {
        $config = $this->readConfig();
        $tax = $this->findOne('tax', [['type' => 'equals', 'field' => 'taxRate', 'value' => 19]], $config)
            ?? $this->first('tax', $config);
        $currency = $this->findOne('currency', [['type' => 'equals', 'field' => 'isoCode', 'value' => 'EUR']], $config)
            ?? $this->first('currency', $config);
        $salesChannel = $this->findOne('sales-channel', [['type' => 'equals', 'field' => 'name', 'value' => 'SkillBuilder Demo Shop']], $config)
            ?? $this->first('sales-channel', $config);

        if ($tax === null || $currency === null || $salesChannel === null) {
            throw new \RuntimeException('Required Shopware base data is missing.');
        }

        $manufacturerId = $this->ensureManufacturer($config);
        $rootCategoryId = $this->resolveRootCategoryId($salesChannel, $config);
        $skillBuilderCategoryId = $this->ensureCategory(self::ROOT_CATEGORY, $rootCategoryId, $config);

        $result = [
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
            'deactivated' => 0,
            'obsoleteChildCategoriesHidden' => 0,
        ];
        $activeProductNumbers = [];

        foreach ($lessons as $lesson) {
            if ($lesson['id'] <= 0 || trim($lesson['title']) === '') {
                $result['skipped']++;
                continue;
            }

            $categoryIds = [$skillBuilderCategoryId];

            $productNumber = self::PRODUCT_PREFIX . $lesson['id'];
            $activeProductNumbers[] = $productNumber;

            $payload = $this->buildProductPayload(
                lesson: $lesson,
                productNumber: $productNumber,
                taxId: (string) $tax['id'],
                currencyId: (string) $currency['id'],
                manufacturerId: $manufacturerId,
                salesChannelId: (string) $salesChannel['id'],
                categoryIds: array_values(array_unique($categoryIds))
            );

            $existingProduct = $this->findOne('product', [
                ['type' => 'equals', 'field' => 'productNumber', 'value' => $productNumber],
            ], $config);

            if ($existingProduct !== null) {
                unset($payload['visibilities']);
                $this->request('PATCH', '/api/product/' . $existingProduct['id'], $payload, $config);
                $result['updated']++;
            } else {
                $this->request('POST', '/api/product', $payload, $config);
                $result['created']++;
            }
        }

        $result['deactivated'] = $this->deactivateUnpublishedProducts($activeProductNumbers, $config);
        $result['obsoleteChildCategoriesHidden'] = $this->hideChildCategories($skillBuilderCategoryId, $config);

        return $result;
    }

    /**
     * @param array{
     *     id:int,
     *     title:string,
     *     description:string
     * } $lesson
     * @param list<string> $categoryIds
     * @return array<string, mixed>
     */
    private function buildProductPayload(
        array $lesson,
        string $productNumber,
        string $taxId,
        string $currencyId,
        string $manufacturerId,
        string $salesChannelId,
        array $categoryIds
    ): array {
        $gross = 37.00;

        return [
            'name' => $lesson['title'],
            'productNumber' => $productNumber,
            'active' => true,
            'stock' => 50,
            'availableStock' => 50,
            'taxId' => $taxId,
            'manufacturerId' => $manufacturerId,
            'description' => $this->buildDescription($lesson),
            'price' => [[
                'currencyId' => $currencyId,
                'gross' => $gross,
                'net' => round($gross / 1.19, 2),
                'linked' => true,
            ]],
            'categories' => array_map(static fn (string $id): array => ['id' => $id], $categoryIds),
            'visibilities' => [[
                'salesChannelId' => $salesChannelId,
                'visibility' => 30,
            ]],
        ];
    }

    /**
     * @param list<string> $activeProductNumbers
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function deactivateUnpublishedProducts(array $activeProductNumbers, array $config): int
    {
        $products = $this->request('POST', '/api/search/product', [
            'limit' => 500,
            'filter' => [[
                'type' => 'prefix',
                'field' => 'productNumber',
                'value' => self::PRODUCT_PREFIX,
            ]],
        ], $config);

        $activeLookup = array_fill_keys($activeProductNumbers, true);
        $deactivated = 0;

        foreach ($products['data'] ?? [] as $product) {
            $productNumber = (string) ($product['productNumber'] ?? '');
            if (isset($activeLookup[$productNumber]) || (bool) ($product['active'] ?? false) === false) {
                continue;
            }

            $this->request('PATCH', '/api/product/' . $product['id'], ['active' => false], $config);
            $deactivated++;
        }

        return $deactivated;
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function hideChildCategories(
        string $skillBuilderCategoryId,
        array $config
    ): int {
        $categories = $this->request('POST', '/api/search/category', [
            'limit' => 500,
            'filter' => [[
                'type' => 'equals',
                'field' => 'parentId',
                'value' => $skillBuilderCategoryId,
            ]],
        ], $config);

        $hidden = 0;

        foreach ($categories['data'] ?? [] as $category) {
            $isAlreadyHidden = (bool) ($category['active'] ?? false) === false
                && (bool) ($category['visible'] ?? false) === false;

            if ($isAlreadyHidden) {
                continue;
            }

            $this->request('PATCH', '/api/category/' . $category['id'], [
                'active' => false,
                'visible' => false,
            ], $config);
            $hidden++;
        }

        return $hidden;
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function ensureManufacturer(array $config): string
    {
        $existing = $this->findOne('product-manufacturer', [
            ['type' => 'equals', 'field' => 'name', 'value' => self::MANUFACTURER],
        ], $config);

        if ($existing !== null) {
            return (string) $existing['id'];
        }

        $id = $this->hexId();
        $this->request('POST', '/api/product-manufacturer', [
            'id' => $id,
            'name' => self::MANUFACTURER,
        ], $config);

        return $id;
    }

    /**
     * @param array<string, mixed> $salesChannel
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function resolveRootCategoryId(array $salesChannel, array $config): string
    {
        $navigationCategoryId = (string) ($salesChannel['navigationCategoryId'] ?? '');
        if ($navigationCategoryId !== '') {
            return $navigationCategoryId;
        }

        $root = $this->first('category', $config);
        if ($root === null) {
            throw new \RuntimeException('No Shopware root category found.');
        }

        return (string) $root['id'];
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function ensureCategory(string $name, string $parentId, array $config): string
    {
        $existing = $this->findOne('category', [
            ['type' => 'equals', 'field' => 'name', 'value' => $name],
            ['type' => 'equals', 'field' => 'parentId', 'value' => $parentId],
        ], $config);

        if ($existing !== null) {
            if ((bool) ($existing['active'] ?? true) === false || (bool) ($existing['visible'] ?? true) === false) {
                $this->request('PATCH', '/api/category/' . $existing['id'], [
                    'active' => true,
                    'visible' => true,
                ], $config);
            }

            return (string) $existing['id'];
        }

        $id = $this->hexId();
        $this->request('POST', '/api/category', [
            'id' => $id,
            'name' => $name,
            'parentId' => $parentId,
            'active' => true,
            'visible' => true,
            'type' => 'page',
        ], $config);

        return $id;
    }

    /**
     * @return array{baseUrl:string, username:string, password:string}
     */
    private function readConfig(): array
    {
        $baseUrl = rtrim((string) ($_ENV['SHOPWARE_ADMIN_BASE_URL'] ?? getenv('SHOPWARE_ADMIN_BASE_URL') ?: ''), '/');
        $username = (string) ($_ENV['SHOPWARE_ADMIN_USERNAME'] ?? getenv('SHOPWARE_ADMIN_USERNAME') ?: '');
        $password = (string) ($_ENV['SHOPWARE_ADMIN_PASSWORD'] ?? getenv('SHOPWARE_ADMIN_PASSWORD') ?: '');

        if ($baseUrl === '' || $username === '' || $password === '') {
            throw new \RuntimeException('Shopware Admin API environment variables are missing.');
        }

        return ['baseUrl' => $baseUrl, 'username' => $username, 'password' => $password];
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     */
    private function token(array $config): string
    {
        if ($this->accessToken !== null) {
            return $this->accessToken;
        }

        $response = $this->rawRequest('POST', $config['baseUrl'] . '/api/oauth/token', [
            'grant_type' => 'password',
            'client_id' => 'administration',
            'username' => $config['username'],
            'password' => $config['password'],
        ]);

        $token = (string) ($response['access_token'] ?? '');
        if ($token === '') {
            throw new \RuntimeException('Could not read Shopware OAuth token.');
        }

        return $this->accessToken = $token;
    }

    /**
     * @param list<array<string, mixed>> $filter
     * @param array{baseUrl:string, username:string, password:string} $config
     * @return array<string, mixed>|null
     */
    private function findOne(string $entity, array $filter, array $config): ?array
    {
        $data = $this->request('POST', '/api/search/' . $entity, [
            'limit' => 1,
            'filter' => $filter,
        ], $config);

        return $data['data'][0] ?? null;
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     * @return array<string, mixed>|null
     */
    private function first(string $entity, array $config): ?array
    {
        $data = $this->request('POST', '/api/search/' . $entity, ['limit' => 1], $config);
        return $data['data'][0] ?? null;
    }

    /**
     * @param array{baseUrl:string, username:string, password:string} $config
     * @return array<string, mixed>
     */
    private function request(string $method, string $path, array $payload, array $config): array
    {
        return $this->rawRequest($method, $config['baseUrl'] . $path, $payload, [
            'Authorization: Bearer ' . $this->token($config),
        ]);
    }

    /**
     * @param list<string> $headers
     * @return array<string, mixed>
     */
    private function rawRequest(string $method, string $url, array $payload, array $headers = []): array
    {
        $json = json_encode($payload, JSON_THROW_ON_ERROR);
        $context = stream_context_create([
            'http' => [
                'method' => $method,
                'header' => implode("\n", array_merge([
                    'Content-Type: application/json',
                    'Accept: application/json',
                ], $headers)),
                'content' => $json,
                'ignore_errors' => true,
                'timeout' => 60,
            ],
        ]);

        $body = file_get_contents($url, false, $context);
        $status = $this->responseStatus($http_response_header ?? []);

        if ($body === false || $status < 200 || $status >= 300) {
            throw new \RuntimeException(sprintf('Shopware API error (%s %s): %s', $method, $url, (string) $body));
        }

        if ($body === '') {
            return [];
        }

        $decoded = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param list<string> $headers
     */
    private function responseStatus(array $headers): int
    {
        foreach ($headers as $header) {
            if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
                return (int) $matches[1];
            }
        }

        return 0;
    }

    /**
     * @param array{
     *     id:int,
     *     title:string,
     *     description:string
     * } $lesson
     */
    private function buildDescription(array $lesson): string
    {
        $description = trim($lesson['description']);

        return implode("\n\n", [
            $description !== '' ? $description : 'Automatically exported SkillBuilder demo course.',
            sprintf('Generated from SkillBuilder lesson #%d.', $lesson['id']),
            'Product data is synchronized through the SkillBuilder admin workflow.',
        ]);
    }

    private function hexId(): string
    {
        return bin2hex(random_bytes(16));
    }
}
