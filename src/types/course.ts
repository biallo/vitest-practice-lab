export type Course = {
  id: string;
  title: string;
  level: string;
  summary: string;
  sections: LessonSection[];
  examples: LessonExample[];
  recap: RecapItem[];
};

export type LessonSection = {
  heading: string;
  body: string[];
};

export type LessonExample = {
  title: string;
  code: string;
  focusLines?: number[];
};

export type RecapItem = {
  question: string;
  answer: string;
};
