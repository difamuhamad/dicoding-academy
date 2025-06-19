import { test, describe } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

describe('full coverage sum', () => {
  // Integer input
  test('should return correct sum for positive numbers', () => {
    assert.strictEqual(sum(3, 7), 10);
    assert.strictEqual(sum(0, 5), 5);
    assert.strictEqual(sum(1, 0), 1);
    assert.strictEqual(sum(0, 0), 0);
  });

  // Nan input
  test('should return 0 if a is not a number', () => {
    assert.strictEqual(sum('5', 3), 0);
    assert.strictEqual(sum(undefined, 2), 0);
    assert.strictEqual(sum(null, 4), 0);
  });

  test('should return 0 if b is not a number', () => {
    assert.strictEqual(sum(5, '3'), 0);
    assert.strictEqual(sum(3, undefined), 0);
    assert.strictEqual(sum(2, null), 0);
  });

  // Negative input
  test('should return 0 if a is negative', () => {
    assert.strictEqual(sum(-1, 5), 0);
  });

  test('should return 0 if b is negative', () => {
    assert.strictEqual(sum(5, -5), 0);
  });

  test('should return 0 if both are negative', () => {
    assert.strictEqual(sum(-3, -4), 0);
  });
});
