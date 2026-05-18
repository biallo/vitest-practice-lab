import type { Course } from "../../types/course";

export const lesson16: Course = {
  id: "lesson-16",
  title: "11. 模块 Mock",
  level: "进阶",
  summary:
    "学习 vi.mock、部分 mock 和模块缓存控制，隔离网络、时间和第三方依赖。",
  sections: [
    {
      heading: "为什么 mock 模块",
      body: [
        "模块 mock 的目的不是让测试看起来更容易通过，而是隔离不可控边界。网络请求、第三方 SDK、随机数、时间和浏览器 API 都可能让测试慢、不稳定或难以复现。",
        "mock 后，测试应该仍然断言业务可见结果，而不是只验证某个内部函数有没有被调用。",
      ],
    },
    {
      heading: "vi.mock 的导入时机",
      body: [
        "Vitest 会提升 vi.mock 调用，所以 mock 通常要写在被测模块 import 之前。这样被测模块在加载依赖时拿到的是 mock 版本。",
        "如果你需要在不同测试中加载不同模块状态，可以配合 vi.resetModules 和动态 import，但这会增加复杂度，应只在确实需要时使用。",
      ],
    },
    {
      heading: "部分 mock",
      body: [
        "有时只需要替换模块中的一个函数，其他导出仍然使用真实实现。vi.importActual 可以拿到真实模块，再覆盖需要控制的部分。",
        "部分 mock 能减少重复实现，也能降低 mock 与真实模块行为偏离的风险。",
      ],
    },
  ],
  examples: [
    {
      title: "替换 API 模块",
      code: `import { expect, it, vi } from 'vitest'
import { loadUserName } from './user-service'
import { fetchUser } from './api'

vi.mock('./api', () => ({
  // 重点：把外部请求替换成可控 mock 函数
  fetchUser: vi.fn()
}))

it('returns the loaded user name', async () => {
  vi.mocked(fetchUser).mockResolvedValue({ id: 'u1', name: 'Ada' })

  await expect(loadUserName('u1')).resolves.toBe('Ada')
  expect(fetchUser).toHaveBeenCalledWith('u1')
})`,
      focusLines: [5, 6, 7, 11, 13, 14],
    },
    {
      title: "保留真实导出，只替换部分函数",
      code: `import { expect, it, vi } from 'vitest'
import { buildReceipt } from './receipt'
import { getExchangeRate } from './currency'

vi.mock('./currency', async () => {
  const actual = await vi.importActual<typeof import('./currency')>('./currency')

  return {
    ...actual,
    // 重点：只替换不稳定的汇率来源，其他工具函数仍用真实实现
    getExchangeRate: vi.fn(() => 7.2)
  }
})

it('builds a receipt with mocked exchange rate', () => {
  const receipt = buildReceipt({ usd: 10 })

  expect(receipt.cny).toBe(72)
  expect(getExchangeRate).toHaveBeenCalled()
})`,
      focusLines: [5, 6, 9, 10, 11, 18, 19],
    },
  ],
  recap: [
    {
      question: "模块 mock 最适合隔离哪些依赖？",
      answer:
        "适合隔离网络请求、第三方 SDK、随机数、时间、浏览器 API 和其他慢或不可控的外部边界。",
    },
    {
      question: "vi.mock 为什么通常要写在被测模块 import 之前？",
      answer:
        "因为被测模块加载依赖时需要拿到 mock 版本。Vitest 会提升 vi.mock，但导入关系仍要保持清晰。",
    },
    {
      question: "vi.importActual 的作用是什么？",
      answer:
        "它可以获取模块真实实现，让你在 mock 中保留大部分真实导出，只替换需要控制的函数。",
    },
    {
      question: "为什么不要过度断言 mock 调用？",
      answer:
        "过度关注内部调用会让测试绑定实现细节。更好的断言是验证用户可见结果或业务结果，同时对关键边界做必要调用检查。",
    },
    {
      question: "什么时候可能需要 vi.resetModules？",
      answer:
        "当不同测试需要重新加载模块并获得不同初始化状态时可以使用，但它会增加复杂度，应谨慎使用。",
    },
    {
      question: "mock 和真实实现偏离会带来什么风险？",
      answer:
        "测试可能通过，但真实环境失败。部分 mock、契约测试和少量集成测试可以降低这种风险。",
    },
  ],
};
