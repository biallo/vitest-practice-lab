import type { Course } from "../../types/course";

export const lesson10: Course = {
  id: "lesson-10",
  title: "10. Mock 函数",
  level: "进阶",
  summary: "使用 vi.fn 和 vi.spyOn 控制函数边界，学习调用断言和 mock 恢复。",
  sections: [
    {
      heading: "Mock 的目标是控制边界",
      body: [
        "Mock 不是为了让测试“看起来通过”，而是为了控制当前测试不关心的边界，例如网络、时间、随机数、日志或第三方 SDK。",
        "能用真实纯函数完成的测试，不要急着 mock。过度 mock 会让测试绑定实现细节，降低重构自由度。",
      ],
    },
    {
      heading: "vi.fn 与 vi.spyOn",
      body: [
        "vi.fn 创建一个可记录调用的新函数，适合作为回调、依赖注入或替身实现。你可以断言它被调用的次数、参数和返回值。",
        "vi.spyOn 观察对象上已有的方法，适合临时替换 console、Date、storage 或服务对象方法。用完要 restore，避免污染其它测试。",
      ],
    },
    {
      heading: "不要过度 mock",
      body: [
        "如果一个依赖是稳定的纯函数，优先使用真实实现。mock 应该用于控制测试边界，而不是替代正常的输入输出验证。",
        "断言 mock 调用时，只检查对业务有意义的交互。过度检查内部调用顺序和中间参数，会让测试很容易被重构打碎。",
      ],
    },
  ],
  examples: [
    {
      title: "用 vi.fn 验证回调",
      code: `import { expect, it, vi } from 'vitest'
import { completeLesson } from './completeLesson'

it('notifies when a lesson is completed', () => {
  const onComplete = vi.fn()

  completeLesson('lesson-10', onComplete)

  expect(onComplete).toHaveBeenCalledTimes(1)
  expect(onComplete).toHaveBeenCalledWith('lesson-10')
})`,
      focusLines: [5, 9, 10],
    },
    {
      title: "用 spy 临时替换方法",
      code: `import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

it('writes a warning for duplicate lessons', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

  addLesson({ id: 'lesson-10' })

  expect(warn).toHaveBeenCalledWith('lesson already exists')
})`,
      focusLines: [4, 8, 12],
    },
  ],
  recap: [
    {
      question: "vi.fn 适合什么场景？",
      answer:
        "适合创建一个新的可观察函数，例如回调、依赖注入函数或简单替身，并断言调用次数和参数。",
    },
    {
      question: "vi.spyOn 和 vi.fn 的区别是什么？",
      answer:
        "vi.spyOn 作用在已有对象方法上，可以观察或替换原方法；vi.fn 是直接创建一个新的 mock 函数。",
    },
    {
      question: "为什么 spy 或 mock 用完要恢复？",
      answer:
        "它们可能改变全局对象或共享模块的行为，不恢复会污染后续测试，让失败变得随机。",
    },
    {
      question: "Mock 的目标是什么？",
      answer:
        "Mock 的目标是控制当前测试不关心的边界，例如网络、时间、随机数、日志或第三方 SDK。",
    },
    {
      question: "为什么过度 mock 会降低测试价值？",
      answer:
        "过度 mock 会让测试绑定实现细节，代码重构时即使用户行为没变，测试也可能大量失败。",
    },
    {
      question: "什么时候不应该急着 mock？",
      answer:
        "当依赖是稳定的纯函数，或者真实实现能让测试更接近业务行为时，不应该为了方便而急着 mock。",
    },
  ],
};
