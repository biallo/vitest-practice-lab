import { describe, it, expect } from 'vitest';
import type { Course, LessonSection, LessonExample, RecapItem } from '../types/course';

describe('Course types', () => {
  it('should create a valid Course object', () => {
    const course: Course = {
      id: 'lesson-1',
      title: 'Introduction to Vitest',
      level: 'Beginner',
      summary: 'Learn the basics of Vitest',
      sections: [],
      examples: [],
      recap: [],
    };

    expect(course.id).toBe('lesson-1');
    expect(course.title).toBe('Introduction to Vitest');
  });

  it('should create a LessonSection', () => {
    const section: LessonSection = {
      heading: 'Getting Started',
      body: ['First paragraph', 'Second paragraph'],
    };

    expect(section.heading).toBe('Getting Started');
    expect(section.body).toHaveLength(2);
  });

  it('should create a LessonExample with optional focusLines', () => {
    const example: LessonExample = {
      title: 'Basic Test',
      code: 'expect(1 + 1).toBe(2)',
      focusLines: [1],
    };

    expect(example.title).toBe('Basic Test');
    expect(example.focusLines).toContain(1);
  });

  it('should create a RecapItem', () => {
    const item: RecapItem = {
      question: 'What is Vitest?',
      answer: 'A fast unit test framework',
    };

    expect(item.question).toBe('What is Vitest?');
    expect(item.answer).toContain('unit test');
  });
});
