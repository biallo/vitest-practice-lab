import type { ReactNode } from 'react'

type CodeBlockProps = {
  children: ReactNode
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="code-block" aria-label="示例代码">
      <code>{children}</code>
    </pre>
  )
}
