import type { Course } from "../../types/course";

export const lesson18: Course = {
  id: "lesson-18",
  title: "18. 浏览器 API 与持久化",
  level: "进阶",
  summary:
    "测试 localStorage、URL、history 和 window API，保证浏览器边界可控且可恢复。",
  sections: [
    {
      heading: "本地存储",
      body: [
        "localStorage 和 sessionStorage 经常用于主题、登录态、草稿、课程进度等轻量状态。测试它们时要关注读写结果、默认值和异常数据恢复。",
        "每个用例结束后清理存储非常重要。否则一个测试写入的数据可能影响另一个测试，导致结果依赖运行顺序。",
      ],
    },
    {
      heading: "URL 与 history",
      body: [
        "许多前端状态来自 URL，例如当前课程、筛选条件、分页和 tab。测试这类逻辑时，应直接设置 window.history 或使用路由测试工具准备初始地址。",
        "断言时优先检查用户可见结果，必要时再检查 URL 是否被正确更新。",
      ],
    },
    {
      heading: "Mock 浏览器 API",
      body: [
        "有些浏览器 API 在 jsdom 中不存在或实现不完整，例如 ResizeObserver、IntersectionObserver、matchMedia。测试需要这些 API 时，可以提供最小 mock。",
        "mock 必须在 teardown 中恢复，避免影响其他测试。浏览器 API mock 越接近用例需求越好，不要为了测试实现一整套浏览器。",
      ],
    },
  ],
  examples: [
    {
      title: "测试 localStorage 持久化",
      code: `import { afterEach, expect, it } from 'vitest'
import { loadProgress, saveProgress } from './progress-store'

afterEach(() => {
  // 重点：持久化状态必须在用例之间清理
  localStorage.clear()
})

it('saves and loads completed lessons', () => {
  saveProgress(['lesson-01', 'lesson-02'])

  expect(loadProgress()).toEqual(['lesson-01', 'lesson-02'])
})`,
      focusLines: [4, 5, 6, 10, 12],
    },
    {
      title: "测试 URL 驱动的状态",
      code: `import { expect, it } from 'vitest'
import { getCurrentLessonFromUrl } from './lesson-url'

it('reads the current lesson from the query string', () => {
  window.history.replaceState({}, '', '/?lesson=lesson-08')

  // 重点：测试前明确设置 URL，避免依赖运行环境里的默认地址
  expect(getCurrentLessonFromUrl()).toBe('lesson-08')
})`,
      focusLines: [5, 7, 8],
    },
    {
      title: "为缺失的浏览器 API 提供最小 mock",
      code: `import { afterEach, expect, it, vi } from 'vitest'
import { isDesktop } from './media'

const matchMedia = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

it('detects a desktop viewport', () => {
  vi.stubGlobal('matchMedia', matchMedia)
  matchMedia.mockReturnValue({ matches: true })

  // 重点：只 mock 当前测试真正需要的返回值
  expect(isDesktop()).toBe(true)
})`,
      focusLines: [4, 6, 11, 12, 14, 15],
    },
  ],
  recap: [
    {
      question: "测试 localStorage 时最容易遗漏什么？",
      answer:
        "最容易遗漏用例之间的清理，以及默认值、损坏数据和不存在数据时的恢复逻辑。",
    },
    {
      question: "URL 驱动状态应该如何准备测试条件？",
      answer:
        "可以用 window.history.replaceState 设置初始地址，或使用路由测试工具提供初始路由。",
    },
    {
      question: "为什么断言时仍然优先看用户可见结果？",
      answer:
        "URL 和存储是实现边界，用户可见结果才是业务承诺。必要时再补充 URL 或存储断言。",
    },
    {
      question: "哪些浏览器 API 可能需要手动 mock？",
      answer:
        "ResizeObserver、IntersectionObserver、matchMedia、scrollTo、clipboard 等在测试环境中可能缺失或行为不完整。",
    },
    {
      question: "浏览器 API mock 为什么要恢复？",
      answer: "全局 API 会影响所有测试文件或后续用例，恢复可以避免跨测试污染。",
    },
    {
      question: "mock 浏览器 API 时应该实现到什么程度？",
      answer:
        "实现到当前测试需要的最小行为即可。过度实现会增加维护成本，也可能制造与真实浏览器不一致的假象。",
    },
  ],
};
