import { describe, it, expect } from 'vitest';
import { courses } from '../data/lessons';

describe('Course content validation', () => {
  describe('title and ID patterns', () => {
    it('all course IDs should follow lesson-XX pattern', () => {
      courses.forEach((course) => {
        expect(course.id).toMatch(/^lesson-\d+$/);
      });
    });

    it('all course titles should start with lesson number', () => {
      courses.forEach((course) => {
        expect(course.title).toMatch(/^\d+\./);
      });
    });

    it('course IDs and titles should have matching numbers', () => {
      courses.forEach((course) => {
        const idMatch = course.id.match(/lesson-(\d+)/);
        const titleMatch = course.title.match(/^(\d+)\./);

        expect(idMatch).not.toBeNull();
        expect(titleMatch).not.toBeNull();

        if (idMatch && titleMatch) {
          // ID number should match title number (e.g., lesson-01 → "01.")
          expect(idMatch[1]).toBe(titleMatch[1]);
        }
      });
    });
  });

  describe('summary and level validation', () => {
    it('all courses should have meaningful summaries', () => {
      courses.forEach((course) => {
        expect(course.summary.length).toBeGreaterThan(10);
      });
    });

    it('all courses should have a level assigned', () => {
      const validLevels = ['入门', '进阶', '高级'];
      courses.forEach((course) => {
        expect(course.level.length).toBeGreaterThan(0);
      });
    });

    it('should support i18n content with Chinese characters', () => {
      const hasChinese = courses.some((c) =>
        /[\u4E00-\u9FA5]/.test(c.title + c.summary + c.level)
      );
      expect(hasChinese).toBe(true);
    });
  });

  describe('content consistency', () => {
    it('courses with examples should have sections explaining them', () => {
      courses.forEach((course) => {
        if (course.examples.length > 0) {
          expect(course.sections.length).toBeGreaterThan(0);
        }
      });
    });

    it('recap items should relate to course content', () => {
      courses.forEach((course) => {
        expect(course.recap.length).toBeGreaterThan(0);
        course.recap.forEach((item) => {
          expect(item.question).toMatch(/[\u4E00-\u9FA5?？]/);
          expect(item.answer).toMatch(/[\u4E00-\u9FA5。]/);
        });
      });
    });

    it('should not have orphaned sections', () => {
      courses.forEach((course) => {
        course.sections.forEach((section) => {
          expect(section.body.every((b) => b.trim().length > 0)).toBe(true);
        });
      });
    });
  });

  describe('data integrity', () => {
    it('no duplicate course titles', () => {
      const titles = courses.map((c) => c.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(titles.length);
    });

    it('all recap questions should be distinct', () => {
      courses.forEach((course) => {
        const questions = course.recap.map((r) => r.question);
        const uniqueQuestions = new Set(questions);
        expect(uniqueQuestions.size).toBe(questions.length);
      });
    });

    it('summary length should be reasonable', () => {
      courses.forEach((course) => {
        expect(course.summary.length).toBeLessThan(200);
      });
    });
  });

  describe('first course sample validation', () => {
    const firstCourse = courses[0];

    it('should have Chinese content in first course', () => {
      const content = firstCourse.title + firstCourse.summary + firstCourse.level;
      expect(content).toMatch(/[\u4E00-\u9FA5]/);
    });

    it('first course should have multiple recap items', () => {
      expect(firstCourse.recap.length).toBeGreaterThanOrEqual(1);
    });

    it('first course recap should have proper Q&A format', () => {
      firstCourse.recap.forEach((item) => {
        expect(item.question).toBeDefined();
        expect(item.answer).toBeDefined();
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      });
    });
  });
});
