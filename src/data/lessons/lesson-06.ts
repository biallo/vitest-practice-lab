import type { Course } from "../../types/course";

export const lesson06: Course = {
  id: "lesson-06",
  title: "06. Mock 函数",
  level: "进阶",
  summary: "使用 vi.fn、vi.spyOn 和模块 mock 隔离依赖。",
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
      heading: "模块 mock",
      body: [
        "模块 mock 用来替换整个导入模块，适合隔离网络层、持久化层或大型依赖。Vitest 的 vi.mock 会影响导入时拿到的模块实现。",
        "模块 mock 最好放在文件顶部，并保持替身尽量小。只 mock 当前测试真正需要控制的 API。",
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

  completeLesson('lesson-06', onComplete)

  expect(onComplete).toHaveBeenCalledTimes(1)
  expect(onComplete).toHaveBeenCalledWith('lesson-06')
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

  addLesson({ id: 'lesson-06' })

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
      question: "模块 mock 最好保持什么原则？",
      answer:
        "尽量放在文件顶部，只替换当前测试真正需要控制的 API，并让替身实现保持小而清楚。",
    },
  ],
};
