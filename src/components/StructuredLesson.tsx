import { CodeExample } from "./CodeExample";
import type { LessonExample, LessonSection } from "../types/course";

type StructuredLessonProps = {
  sections: LessonSection[];
  examples: LessonExample[];
};

export function StructuredLesson({
  sections,
  examples,
}: StructuredLessonProps) {
  return (
    <article className="lesson-content">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="examples-section">
        <h2>示例代码</h2>
        <div className="example-stack">
          {examples.map((example) => (
            <CodeExample
              key={example.title}
              title={example.title}
              code={example.code}
              focusLines={example.focusLines}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
