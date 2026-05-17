import { describe, it, expect } from 'vitest';

describe('App utility functions', () => {
  describe('Hash utilities', () => {
    it('should extract lesson ID from hash', () => {
      const hash = '#lesson-1';
      const lessonId = hash.replace('#', '');
      expect(lessonId).toBe('lesson-1');
    });

    it('should handle empty hash', () => {
      const hash = '#';
      const lessonId = hash.replace('#', '');
      expect(lessonId).toBe('');
    });

    it('should handle hash with special characters', () => {
      const hash = '#lesson-advanced-01';
      const lessonId = hash.replace('#', '');
      expect(lessonId).toBe('lesson-advanced-01');
    });
  });

  describe('Set deduplication', () => {
    it('should remove duplicate lesson IDs', () => {
      const lessonIds = ['lesson-1', 'lesson-2', 'lesson-1', 'lesson-3', 'lesson-2'];
      const uniqueIds = Array.from(new Set(lessonIds));
      expect(uniqueIds).toHaveLength(3);
      expect(uniqueIds).toEqual(['lesson-1', 'lesson-2', 'lesson-3']);
    });

    it('should handle empty array', () => {
      const lessonIds: string[] = [];
      const uniqueIds = Array.from(new Set(lessonIds));
      expect(uniqueIds).toHaveLength(0);
    });

    it('should preserve order of first occurrence', () => {
      const lessonIds = ['c', 'b', 'a', 'c', 'b'];
      const uniqueIds = Array.from(new Set(lessonIds));
      expect(uniqueIds).toEqual(['c', 'b', 'a']);
    });
  });

  describe('Array filtering', () => {
    it('should filter valid lesson IDs', () => {
      const validIds = ['lesson-1', 'lesson-2', 'lesson-3'];
      const mixedIds = ['lesson-1', 'invalid', 'lesson-2', 'unknown'];
      const filtered = mixedIds.filter((id) => validIds.includes(id));
      expect(filtered).toEqual(['lesson-1', 'lesson-2']);
    });

    it('should handle type checking with filter', () => {
      const data: (string | number | null)[] = ['lesson-1', 123, 'lesson-2', null];
      const stringIds = data.filter((id): id is string => typeof id === 'string');
      expect(stringIds).toEqual(['lesson-1', 'lesson-2']);
      expect(stringIds).toHaveLength(2);
    });
  });
});
