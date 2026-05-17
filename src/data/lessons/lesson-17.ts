import type { Course } from "../../types/course";

export const lesson17: Course = {
  id: "lesson-17",
  title: "17. 测试 React Hook",
  level: "进阶",
  summary: "通过组件或 renderHook 验证自定义 Hook 的状态、事件和异步行为。",
  sections: [
    {
      heading: "优先通过使用场景测试",
      body: [
        "自定义 Hook 本质上是组件逻辑。只要 Hook 的行为最终体现在界面上，优先通过组件测试验证用户能看到和操作的结果。",
        "直接测试 Hook 适合纯逻辑 Hook、复用复杂状态机、或组件外壳会让测试噪音过大的场景。",
      ],
    },
    {
      heading: "renderHook 的价值",
      body: [
        "renderHook 可以在测试中运行 Hook，并通过 result.current 读取当前状态。触发会改变状态的函数时，需要用 act 包住。",
        "它适合测试 useCounter、usePagination、useLocalStorage 这类状态逻辑清晰的 Hook。",
      ],
    },
    {
      heading: "异步 Hook",
      body: [
        "异步 Hook 经常涉及 loading、success、error 三种状态。测试时要先断言初始状态，再用 waitFor 等待状态稳定。",
        "不要用固定延迟等待异步完成。固定等待会让测试慢且不稳定，应该等待某个明确的状态或 UI 结果。",
      ],
    },
  ],
  examples: [
    {
      title: "测试同步状态 Hook",
      code: `import { act, renderHook } from '@testing-library/react'
import { expect, it } from 'vitest'
import { useCounter } from './use-counter'

it('increments the counter', () => {
  const { result } = renderHook(() => useCounter(0))

  act(() => {
    // 重点：触发 React 状态更新的操作要放进 act
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})`,
      focusLines: [6, 8, 9, 10, 13],
    },
    {
      title: "测试异步 Hook 状态",
      code: `import { renderHook, waitFor } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useUser } from './use-user'
import { fetchUser } from './api'

vi.mock('./api', () => ({
  fetchUser: vi.fn()
}))

it('loads user data', async () => {
  vi.mocked(fetchUser).mockResolvedValue({ id: 'u1', name: 'Ada' })

  const { result } = renderHook(() => useUser('u1'))

  expect(result.current.status).toBe('loading')

  await waitFor(() => {
    // 重点：等待明确状态，而不是等待固定毫秒数
    expect(result.current.status).toBe('success')
  })
  expect(result.current.user?.name).toBe('Ada')
})`,
      focusLines: [11, 13, 15, 17, 18, 19, 21],
    },
  ],
  recap: [
    {
      question: "什么时候应该通过组件测试 Hook？",
      answer:
        "当 Hook 行为最终体现在界面或用户交互上时，优先通过组件测试，因为它更接近真实使用方式。",
    },
    {
      question: "renderHook 适合什么场景？",
      answer:
        "适合测试纯状态逻辑、自定义复用逻辑、分页、表单状态、本地存储封装等组件外壳噪音较大的 Hook。",
    },
    {
      question: "为什么状态更新要放进 act？",
      answer:
        "act 会告诉 React 测试正在执行一次状态更新，让渲染和副作用完成后再进行断言。",
    },
    {
      question: "异步 Hook 测试为什么不推荐固定等待？",
      answer:
        "固定等待会让测试慢且不稳定。waitFor 等待明确状态更快，也更能表达测试意图。",
    },
    {
      question: "异步 Hook 通常应该覆盖哪些状态？",
      answer:
        "至少覆盖 loading、success 和 error。复杂场景还应覆盖取消请求、参数变化和重复请求。",
    },
  ],
};
