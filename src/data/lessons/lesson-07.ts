import type { Course } from "../../types/course";

export const lesson07: Course = {
  id: "lesson-07",
  title: "07. React 组件测试",
  level: "进阶",
  summary: "结合 Testing Library 测试组件行为，而不是测试实现细节。",
  sections: [
    {
      heading: "组件测试关注用户行为",
      body: [
        "React 组件测试应该尽量从用户能看到、能操作的内容出发：文本、按钮、表单、链接、状态变化和可访问名称。",
        "不要断言组件内部 state、私有函数或 className 拼接，除非这些就是公共契约。组件内部实现越少暴露，重构越安全。",
      ],
    },
    {
      heading: "查询方式的优先级",
      body: [
        "Testing Library 推荐优先使用 getByRole、getByLabelText、getByText 等接近用户感知的查询。它们能顺便推动组件保持可访问。",
        "当界面需要等待异步渲染时，使用 findByRole 或 waitFor。不要用固定时间 sleep 等待 DOM。",
      ],
    },
    {
      heading: "环境配置",
      body: [
        "React 组件通常需要 DOM 环境。Vitest 中可以配置 environment: jsdom，并在 setupFiles 中引入 @testing-library/jest-dom/vitest 扩展 matcher。",
        "组件测试比纯函数测试慢一点，所以只把真正涉及渲染、交互和可访问行为的逻辑放进组件测试。",
      ],
    },
  ],
  examples: [
    {
      title: "测试按钮交互",
      code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { CompletionButton } from './CompletionButton'

it('marks the lesson as completed', async () => {
  const user = userEvent.setup()
  render(<CompletionButton />)

  await user.click(screen.getByRole('button', { name: '标记完成' }))

  expect(screen.getByRole('button', { name: '已完成' })).toBeDisabled()
})`,
      focusLines: [10, 12],
    },
    {
      title: "组件测试环境配置",
      code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
})`,
      focusLines: [6, 7, 8],
    },
  ],
  recap: [
    {
      question: "React 组件测试为什么优先使用 getByRole？",
      answer:
        "getByRole 更接近用户和辅助技术看到的界面，也能暴露按钮、表单等元素的可访问名称问题。",
    },
    {
      question: "为什么不建议断言组件内部 state？",
      answer:
        "内部 state 是实现细节。用户关心的是界面结果和交互反馈，绑定 state 会让重构成本变高。",
    },
    {
      question: "组件测试通常需要什么 Vitest 环境？",
      answer:
        "通常需要 jsdom 环境，让 React 组件可以在测试中使用 DOM API 渲染和交互。",
    },
    {
      question: "什么时候应该用 findByRole？",
      answer:
        "当界面内容需要等待异步渲染后才出现时，findByRole 会等待目标元素，比固定 sleep 更可靠。",
    },
    {
      question: "@testing-library/jest-dom/vitest 通常放在哪里？",
      answer:
        "通常放在 setupFiles 指向的测试准备文件里，用来扩展 toBeInTheDocument、toBeDisabled 等 DOM matcher。",
    },
  ],
};
