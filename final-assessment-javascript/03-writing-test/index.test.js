import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

describe('sum function', () => {
  // Integer input
  test('should add correctly', () => {
    const operandA = 2;
    const operandB = 3;

    const actualValue = sum(operandA, operandB);
    const expectedValue = 5;

    assert.equal(actualValue, expectedValue);
  });

  // String input
  test('should concatenate if string passed on operandA', () => {
    const operandA = '1';
    const operandB = 5;

    const actualValue = sum(operandA, operandB);
    const expectedValue = '15';

    assert.equal(actualValue, expectedValue);
  });

  test('should concatenate if string passed on operandB', () => {
    const operandA = 10;
    const operandB = '5';

    const actualValue = sum(operandA, operandB);
    const expectedValue = '105';

    assert.equal(actualValue, expectedValue);
  });
});
