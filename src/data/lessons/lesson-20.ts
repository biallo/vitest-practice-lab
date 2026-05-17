import type { Course } from "../../types/course";

export const lesson20: Course = {
  id: "lesson-20",
  title: "20. 测试可维护性",
  level: "进阶",
  summary: "用清晰命名、测试工厂和行为断言，让测试长期可读、可改、可信任。",
  sections: [
    {
      heading: "测试也是代码",
      body: [
        "测试需要像产品代码一样被维护。命名、结构、重复、边界和抽象层次都会影响后续修改成本。",
        "可维护测试的目标不是写得最短，而是失败时容易定位，需求变化时容易更新，重构实现时不无故失败。",
      ],
    },
    {
      heading: "使用 Arrange Act Assert",
      body: [
        "Arrange 准备数据和依赖，Act 执行被测行为，Assert 验证结果。这个结构能让读者快速判断测试在验证什么。",
        "如果一个测试里有多次 Act 和多组断言，通常说明它测试了太多行为，可以拆成更小的用例。",
      ],
    },
    {
      heading: "用工厂降低噪音",
      body: [
        "测试数据经常有很多与当前断言无关的字段。工厂函数可以提供合理默认值，让每个测试只覆盖自己关心的差异。",
        "工厂要保持简单，不要把业务规则藏进工厂里。否则测试失败时很难判断问题来自测试数据还是被测代码。",
      ],
    },
    {
      heading: "避免脆弱断言",
      body: [
        "脆弱测试通常断言实现细节，例如内部函数调用顺序、私有状态、样式类名或临时 DOM 结构。实现一重构，测试就大量失败。",
        "更稳的测试会断言业务行为、可访问角色、可见文本、状态变化和对外输出。",
      ],
    },
  ],
  examples: [
    {
      title: "用工厂准备测试数据",
      code: `import { expect, it } from 'vitest'
import { canStartLesson } from './lesson-rules'

function createLesson(overrides = {}) {
  return {
    id: 'lesson-01',
    title: '认识 Vitest',
    completed: false,
    locked: false,
    ...overrides
  }
}

it('does not allow starting a locked lesson', () => {
  const lesson = createLesson({ locked: true })

  // 重点：测试只暴露当前场景关心的字段
  expect(canStartLesson(lesson)).toBe(false)
})`,
      focusLines: [4, 5, 10, 15, 17, 18],
    },
    {
      title: "断言行为，而不是实现细节",
      code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { LessonRecap } from './lesson-recap'

it('marks a lesson as completed from recap', async () => {
  const user = userEvent.setup()
  render(<LessonRecap lessonId="lesson-01" />)

  await user.click(screen.getByRole('button', { name: '标记完成' }))

  // 重点：验证用户可见状态，而不是内部 state 名称或 className
  expect(screen.getByRole('button', { name: '已完成' })).toBeDisabled()
})`,
      focusLines: [8, 10, 12, 13],
    },
  ],
  recap: [
    {
      question: "可维护测试最重要的特征是什么？",
      answer:
        "失败时容易定位问题，需求变化时容易更新，内部实现重构时不会因为无关细节大量失败。",
    },
    {
      question: "Arrange Act Assert 分别是什么？",
      answer: "Arrange 准备数据和依赖，Act 执行被测行为，Assert 验证结果。",
    },
    {
      question: "什么时候应该拆分测试？",
      answer:
        "当一个测试包含多个行为、多个 Act 或失败后难以判断具体规则时，就应该拆分。",
    },
    {
      question: "测试工厂的价值是什么？",
      answer:
        "提供稳定默认数据，让每个测试只声明自己关心的差异，减少无关字段造成的阅读噪音。",
    },
    {
      question: "测试工厂不应该做什么？",
      answer:
        "不应该隐藏复杂业务规则或产生难以预测的数据，否则会让测试原因变得不透明。",
    },
    {
      question: "什么是脆弱断言？",
      answer:
        "过度绑定实现细节的断言，例如内部调用顺序、私有状态、临时 className 或不稳定 DOM 结构。",
    },
  ],
};
