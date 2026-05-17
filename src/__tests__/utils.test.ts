import { describe, it, expect } from 'vitest';

function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

function multiply(a: number, b: number) {
  return a * b;
}

describe('Basic math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(10, -5)).toBe(5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(10, 3)).toBe(7);
    });

    it('should handle negative results', () => {
      expect(subtract(3, 10)).toBe(-7);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });

    it('should handle multiplication by zero', () => {
      expect(multiply(10, 0)).toBe(0);
    });
  });
});
