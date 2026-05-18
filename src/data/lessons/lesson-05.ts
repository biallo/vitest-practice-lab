import type { Course } from "../../types/course";

export const lesson05: Course = {
  id: "lesson-05",
  title: "06. 测试异步代码",
  level: "基础",
  summary: "测试 Promise、async/await、错误分支与等待时机。",
  sections: [
    {
      heading: "异步测试必须等待结果",
      body: [
        "异步测试最常见的问题是测试函数已经结束，但异步断言还没有执行。Vitest 只有在你 return Promise 或使用 async/await 时，才知道应该等待。",
        "凡是依赖异步结果的断言，都应该出现在 await 之后，或者使用 await expect(promise).resolves/rejects。",
      ],
    },
    {
      heading: "错误路径和成功路径一样重要",
      body: [
        "网络失败、权限不足、空数据和超时都是用户真实会遇到的情况。只测试 happy path 会让代码在异常路径上没有保护。",
        "测试错误路径时，断言应该落在业务响应上，例如返回默认值、抛出明确错误、展示错误消息，而不是仅仅确认 catch 被执行。",
      ],
    },
    {
      heading: "控制时间和重试",
      body: [
        "涉及 setTimeout、重试、轮询或 debounce 的逻辑，不应该让测试真实等待几秒钟。Vitest 提供 fake timers 来控制时间推进。",
        "使用 fake timers 时，要在每个测试后恢复真实定时器，避免影响同文件后续测试。",
      ],
    },
  ],
  examples: [
    {
      title: "等待 Promise 结果",
      code: `import { expect, it } from 'vitest'
import { loadLesson } from './loadLesson'

it('loads lesson details', async () => {
  const lesson = await loadLesson('lesson-01')

  expect(lesson.title).toBe('认识 Vitest')
  expect(lesson.completed).toBe(false)
})`,
      focusLines: [4, 5, 7],
    },
    {
      title: "用 fake timers 测试延迟逻辑",
      code: `import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.useRealTimers()
})

it('marks a save operation as timed out', async () => {
  vi.useFakeTimers()
  const promise = saveWithTimeout()

  await vi.advanceTimersByTimeAsync(5000)

  await expect(promise).rejects.toThrow('save timed out')
})`,
      focusLines: [8, 11, 13],
    },
  ],
  recap: [
    {
      question: "为什么异步测试函数通常要写成 async？",
      answer:
        "这样可以用 await 等待异步结果，Vitest 也能知道测试应该等 Promise 完成后再判断通过或失败。",
    },
    {
      question: "测试 rejects 时为什么要加 await？",
      answer:
        "rejects 返回的是一个异步断言 Promise，不 await 的话测试可能提前结束，失败不会被正确捕获。",
    },
    {
      question: "fake timers 用完后为什么要恢复？",
      answer:
        "fake timers 会改变当前测试环境的定时器行为，不恢复会污染后续测试，造成难以定位的失败。",
    },
    {
      question: "异步错误路径为什么要像成功路径一样测试？",
      answer:
        "网络失败、超时、空数据等异常路径是用户真实会遇到的情况，只测成功路径无法保护这些行为。",
    },
    {
      question: "什么时候不应该用真实 sleep 等待？",
      answer:
        "涉及定时器、重试、轮询或 debounce 时，真实等待会让测试变慢且不稳定，应该用 fake timers 控制时间。",
    },
  ],
};
