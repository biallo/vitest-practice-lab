import { describe, it, expect } from 'vitest';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str: string) {
  return str.split('').reverse().join('');
}

function countWords(str: string) {
  return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}

describe('String utilities', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('reverseString', () => {
    it('should reverse a string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });

    it('should handle single character', () => {
      expect(reverseString('a')).toBe('a');
    });

    it('should handle empty string', () => {
      expect(reverseString('')).toBe('');
    });
  });

  describe('countWords', () => {
    it('should count words separated by spaces', () => {
      expect(countWords('hello world')).toBe(2);
    });

    it('should handle multiple spaces', () => {
      expect(countWords('hello  world   test')).toBe(3);
    });

    it('should handle leading/trailing spaces', () => {
      expect(countWords('  hello world  ')).toBe(2);
    });

    it('should return 0 for empty string', () => {
      expect(countWords('')).toBe(0);
    });
  });
});
