import { describe, it, expect } from 'vitest';
import { courses } from '../data/lessons';

describe('Real course data structure', () => {
  describe('courses collection', () => {
    it('should have multiple courses loaded', () => {
      expect(courses.length).toBeGreaterThan(0);
    });

    it('should have at least 10 courses', () => {
      expect(courses.length).toBeGreaterThanOrEqual(10);
    });

    it('should have unique course IDs', () => {
      const ids = courses.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('course structure validation', () => {
    it('every course should have required fields', () => {
      courses.forEach((course) => {
        expect(course.id).toBeDefined();
        expect(course.title).toBeDefined();
        expect(course.level).toBeDefined();
        expect(course.summary).toBeDefined();
        expect(Array.isArray(course.sections)).toBe(true);
        expect(Array.isArray(course.examples)).toBe(true);
        expect(Array.isArray(course.recap)).toBe(true);
      });
    });

    it('every course should have non-empty title and summary', () => {
      courses.forEach((course) => {
        expect(course.title.length).toBeGreaterThan(0);
        expect(course.summary.length).toBeGreaterThan(0);
      });
    });

    it('every course should have at least one recap item', () => {
      courses.forEach((course) => {
        expect(course.recap.length).toBeGreaterThan(0);
      });
    });
  });

  describe('sections validation', () => {
    it('every section should have heading and body', () => {
      courses.forEach((course) => {
        course.sections.forEach((section) => {
          expect(section.heading).toBeDefined();
          expect(section.heading.length).toBeGreaterThan(0);
          expect(Array.isArray(section.body)).toBe(true);
          expect(section.body.length).toBeGreaterThan(0);
        });
      });
    });

    it('every body item should be non-empty string', () => {
      courses.forEach((course) => {
        course.sections.forEach((section) => {
          section.body.forEach((item) => {
            expect(typeof item).toBe('string');
            expect(item.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  describe('examples validation', () => {
    it('every example should have title and code', () => {
      courses.forEach((course) => {
        course.examples.forEach((example) => {
          expect(example.title).toBeDefined();
          expect(example.code).toBeDefined();
          expect(example.title.length).toBeGreaterThan(0);
          expect(example.code.length).toBeGreaterThan(0);
        });
      });
    });

    it('examples can have optional focusLines', () => {
      courses.forEach((course) => {
        course.examples.forEach((example) => {
          if (example.focusLines !== undefined) {
            expect(Array.isArray(example.focusLines)).toBe(true);
            example.focusLines.forEach((line) => {
              expect(typeof line).toBe('number');
              expect(line).toBeGreaterThan(0);
            });
          }
        });
      });
    });
  });

  describe('recap items validation', () => {
    it('every recap item should have question and answer', () => {
      courses.forEach((course) => {
        course.recap.forEach((item) => {
          expect(item.question).toBeDefined();
          expect(item.answer).toBeDefined();
          expect(item.question.length).toBeGreaterThan(0);
          expect(item.answer.length).toBeGreaterThan(0);
        });
      });
    });

    it('questions and answers should be strings', () => {
      courses.forEach((course) => {
        course.recap.forEach((item) => {
          expect(typeof item.question).toBe('string');
          expect(typeof item.answer).toBe('string');
        });
      });
    });
  });

  describe('first course (lesson-01) sample validation', () => {
    const firstCourse = courses[0];

    it('should have valid structure', () => {
      expect(firstCourse).toBeDefined();
      expect(firstCourse.id).toMatch(/^lesson-/);
      expect(firstCourse.sections.length).toBeGreaterThan(0);
      expect(firstCourse.recap.length).toBeGreaterThan(0);
    });

    it('should have at least one section with content', () => {
      expect(firstCourse.sections.length).toBeGreaterThan(0);
      const firstSection = firstCourse.sections[0];
      expect(firstSection.body.length).toBeGreaterThan(0);
    });

    it('should have recap items for self-testing', () => {
      const recapItems = firstCourse.recap;
      expect(recapItems.length).toBeGreaterThan(0);
      recapItems.forEach((item) => {
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      });
    });
  });
});
