<?php

declare(strict_types=1);

namespace PortfolioExample\SkillBuilderShopwareImport;

use App\Entity\Lesson;
use App\Repository\LessonRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
final class AdminShopwareDemoProductController extends AbstractController
{
    #[Route('/admin/shopware/demo-products', name: 'admin_shopware_demo_products', methods: ['POST'])]
    public function __invoke(
        Request $request,
        LessonRepository $lessonRepository,
        ShopwareDemoProductImporter $importer
    ): RedirectResponse {
        if (!$this->isCsrfTokenValid('admin_shopware_demo_products', (string) $request->request->get('_token'))) {
            throw $this->createAccessDeniedException('Invalid CSRF token.');
        }

        try {
            $lessons = array_map(
                fn (Lesson $lesson): array => $this->normalizeLesson($lesson),
                $lessonRepository->findBy(['status' => 'published'], ['id' => 'ASC'])
            );

            $result = $importer->importLessons($lessons);

            $this->addFlash(
                'success',
                sprintf(
                    'Shopware import complete: %d created, %d updated, %d deactivated, %d old demo category remnants cleaned up.',
                    $result['created'],
                    $result['updated'],
                    $result['deactivated'],
                    $result['obsoleteChildCategoriesHidden']
                )
            );
        } catch (\Throwable $exception) {
            $this->addFlash('error', 'Shopware import failed: ' . $exception->getMessage());
        }

        return $this->redirectToRoute('app_lesson_index', ['_fragment' => 'admin-tools']);
    }

    /**
     * @return array{
     *     id:int,
     *     title:string,
     *     description:string
     * }
     */
    private function normalizeLesson(Lesson $lesson): array
    {
        return [
            'id' => (int) $lesson->getId(),
            'title' => $lesson->getTitle(),
            'description' => (string) $lesson->getDescription(),
        ];
    }
}
