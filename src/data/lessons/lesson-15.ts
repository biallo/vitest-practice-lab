import type { Course } from "../../types/course";

export const lesson15: Course = {
  id: "lesson-15",
  title: "15. Setup 与 Teardown",
  level: "进阶",
  summary:
    "掌握 beforeEach、afterEach、beforeAll 和 afterAll，让测试准备和清理可预测。",
  sections: [
    {
      heading: "生命周期的作用",
      body: [
        "setup 是测试前准备，teardown 是测试后清理。它们的目标不是减少几行代码，而是保证每个测试都在可预测的状态下运行。",
        "beforeEach 和 afterEach 适合处理每个用例都要重置的状态，例如 mock、localStorage、DOM 和 fake timers。",
      ],
    },
    {
      heading: "一次性资源",
      body: [
        "beforeAll 和 afterAll 适合昂贵的一次性资源，例如启动测试服务器、建立数据库连接或准备全局 fixture。",
        "只要资源会被测试修改，就要小心共享状态。共享资源能提升速度，但也更容易让测试互相影响。",
      ],
    },
    {
      heading: "清理优先于补救",
      body: [
        "好的 teardown 会让测试失败后仍然能恢复环境。不要依赖测试顺序，也不要让某个测试的残留状态成为下个测试的隐式前提。",
        "如果测试偶尔失败，第一时间检查是否有未清理的 mock、计时器、DOM、网络拦截或本地存储。",
      ],
    },
  ],
  examples: [
    {
      title: "每个用例前后保持干净状态",
      code: `import { afterEach, beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.setItem('theme', 'light')
})

afterEach(() => {
  // 重点：先恢复计时器，再清理 mock 和持久化状态
  vi.useRealTimers()
  vi.restoreAllMocks()
  localStorage.clear()
})

it('saves the selected theme', () => {
  localStorage.setItem('theme', 'dark')

  expect(localStorage.getItem('theme')).toBe('dark')
})`,
      focusLines: [3, 8, 9, 10, 11, 12],
    },
    {
      title: "一次性准备和释放资源",
      code: `import { afterAll, beforeAll, expect, it } from 'vitest'
import { createTestServer } from './test-server'

let server: Awaited<ReturnType<typeof createTestServer>>

beforeAll(async () => {
  // 重点：昂贵资源只启动一次，减少重复成本
  server = await createTestServer()
})

afterAll(async () => {
  // 重点：释放资源，避免 CI 进程无法正常退出
  await server.close()
})

it('responds with a health status', async () => {
  const response = await server.get('/health')

  expect(response.status).toBe(200)
})`,
      focusLines: [6, 7, 11, 12, 13],
    },
  ],
  recap: [
    {
      question: "beforeEach 和 beforeAll 的核心区别是什么？",
      answer:
        "beforeEach 会在每个用例前运行，适合重置状态；beforeAll 只在当前作用域所有用例前运行一次，适合昂贵的一次性资源。",
    },
    {
      question: "afterEach 通常应该清理哪些内容？",
      answer:
        "通常清理 mock、fake timers、DOM、localStorage、网络拦截和其他会影响后续测试的全局状态。",
    },
    {
      question: "为什么共享资源有风险？",
      answer:
        "共享资源可能被某个测试修改，导致后续测试依赖隐式状态，从而出现顺序相关或偶发失败。",
    },
    {
      question: "测试偶发失败时，优先检查什么？",
      answer:
        "优先检查未恢复的 mock、计时器、异步任务、DOM、存储和网络拦截，因为它们最容易跨测试污染。",
    },
    {
      question: "teardown 为什么要在测试失败时也能工作？",
      answer:
        "测试失败不应该破坏后续测试环境。可靠的 teardown 能让失败局部化，避免一个错误拖垮整组用例。",
    },
  ],
};
