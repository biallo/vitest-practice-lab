import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

type CodeExampleProps = {
  title: string;
  code: string;
  focusLines?: number[];
};

const keywordPattern =
  /\b(import|from|const|let|return|async|await|function|describe|it|test|expect|beforeEach|afterEach|vi|class|new|throw|try|catch|if|else|export|default|type)\b/g;

export function CodeExample({
  title,
  code,
  focusLines = [],
}: CodeExampleProps) {
  return (
    <div className="code-example">
      <h3>{title}</h3>
      <CodeBlock>
        {code.split("\n").map((line, index) => {
          const lineNumber = index + 1;
          return (
            <span
              className={focusLines.includes(lineNumber) ? "focus-line" : ""}
              key={`${lineNumber}-${line}`}
            >
              {highlightCodeLine(line)}
            </span>
          );
        })}
      </CodeBlock>
    </div>
  );
}

function highlightCodeLine(line: string) {
  const commentIndex = line.indexOf("//");

  if (commentIndex >= 0) {
    return (
      <>
        {highlightCodeTokens(line.slice(0, commentIndex))}
        <i className="comment">{line.slice(commentIndex)}</i>
      </>
    );
  }

  return highlightCodeTokens(line);
}

function highlightCodeTokens(line: string) {
  const nodes: ReactNode[] = [];
  const tokenPattern = /(['"`])(?:\\.|(?!\1).)*\1/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(line))) {
    nodes.push(...highlightKeywords(line.slice(cursor, match.index)));
    nodes.push(<em key={`string-${match.index}`}>{match[0]}</em>);
    cursor = match.index + match[0].length;
  }

  nodes.push(...highlightKeywords(line.slice(cursor)));
  return nodes;
}

function highlightKeywords(text: string) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  keywordPattern.lastIndex = 0;
  while ((match = keywordPattern.exec(text))) {
    nodes.push(text.slice(cursor, match.index));
    nodes.push(<b key={`keyword-${match.index}-${match[0]}`}>{match[0]}</b>);
    cursor = match.index + match[0].length;
  }

  nodes.push(text.slice(cursor));
  return nodes;
}
