import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('storefront keeps no-sale demo guardrails visible', () => {
  for (const requiredText of [
    'Keine echten Bestellungen',
    'Keine Zahlung aktiv',
    'Bestellung deaktiviert',
    'Demo-Shop'
  ]) {
    assert.match(source, new RegExp(requiredText));
  }
});

test('storefront does not expose account or registration flows', () => {
  for (const forbiddenText of ['account/login', 'register', 'alert(']) {
    assert.equal(source.includes(forbiddenText), false);
  }
});
