import type { Course } from "../../types/course";

export const lesson18: Course = {
  id: "lesson-18",
  title: "18. 从 Jest 迁移",
  level: "迁移",
  summary: "比较 Jest 与 Vitest API、配置和迁移策略，降低迁移风险。",
  sections: [
    {
      heading: "先迁移运行环境",
      body: [
        "从 Jest 迁移到 Vitest，不要一开始就重写所有测试。第一步应该是让现有测试尽可能跑起来，再逐步处理差异。",
        "重点检查 transform、module alias、test environment、setupFiles、mock API 和 snapshot 格式。每类差异都应该用小步提交验证。",
      ],
    },
    {
      heading: "API 相似但不是完全相同",
      body: [
        "describe、it、expect 等基础 API 很接近，很多测试可以直接迁移。mock 相关 API 则需要更认真检查，尤其是 hoist、模块导入时机和自动恢复策略。",
        "Jest 的全局 API 如果没有显式导入，迁移时可以选择开启 globals，也可以改成从 vitest 导入。长期看，显式导入更清楚。",
      ],
    },
    {
      heading: "迁移策略",
      body: [
        "推荐先选择一个测试文件或一个模块做试点，整理出项目内的迁移规则，再批量处理。不要在同一个 PR 里同时改框架、改测试逻辑和改业务代码。",
        "如果项目里大量使用 jest.mock、jest.spyOn、jest.useFakeTimers，可以先建立迁移对照表，避免逐个文件临时猜写法。",
      ],
    },
  ],
  examples: [
    {
      title: "从 Jest 导入改为 Vitest 导入",
      code: `// before
import { describe, expect, test, jest } from '@jest/globals'

// after
import { describe, expect, test, vi } from 'vitest'

test('calls the callback', () => {
  const callback = vi.fn()

  callback('done')

  expect(callback).toHaveBeenCalledWith('done')
})`,
      focusLines: [5, 8],
    },
    {
      title: "配置兼容的 DOM 测试环境",
      code: `export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/test/setup.ts'
  }
})`,
      focusLines: [2, 3, 4],
    },
  ],
  recap: [
    {
      question: "从 Jest 迁移时为什么不建议一次性重写所有测试？",
      answer:
        "一次性重写会混合框架差异和测试逻辑变化，风险高且难回滚。先让现有测试跑起来更稳妥。",
    },
    {
      question: "Jest 的 jest.fn 在 Vitest 中通常换成什么？",
      answer:
        "通常换成 vi.fn。spy、fake timers 和模块 mock 也大多迁移到 vi 命名空间下。",
    },
    {
      question: "globals 配置应该怎么取舍？",
      answer:
        "开启 globals 可以减少迁移改动；显式从 vitest 导入 API 更清楚，也更利于编辑器和静态分析。",
    },
    {
      question: "迁移时第一批应该检查哪些配置？",
      answer:
        "重点检查 transform、module alias、test environment、setupFiles、mock API 和 snapshot 格式。",
    },
    {
      question: "为什么要先做试点迁移？",
      answer:
        "试点可以暴露项目内的典型差异，形成迁移规则后再批量处理，能降低重复踩坑和大范围回滚风险。",
    },
    {
      question: "mock 相关迁移为什么要更谨慎？",
      answer:
        "mock 受 hoist、模块导入时机和恢复策略影响较大，API 名称相似不代表行为完全一致。",
    },
  ],
};
