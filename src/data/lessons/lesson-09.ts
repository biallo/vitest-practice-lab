import type { Course } from "../../types/course";

export const lesson09: Course = {
  id: "lesson-09",
  title: "09. 测试环境",
  level: "进阶",
  summary: "区分 node、jsdom 和 happy-dom，按测试目标选择合适的运行环境。",
  sections: [
    {
      heading: "node 环境",
      body: [
        "node 是 Vitest 的默认测试环境，适合测试纯函数、服务端工具、数据转换、校验规则和不依赖 DOM 的模块。它启动更轻，反馈更快。",
        "如果测试目标不需要 document、window、HTMLElement，就优先使用 node。测试环境越小，失败原因越集中。",
      ],
    },
    {
      heading: "jsdom 与 happy-dom",
      body: [
        "React 组件、DOM 查询、表单交互和浏览器事件通常需要浏览器式环境。jsdom 兼容性更常见，生态文档更多；happy-dom 通常更轻，但遇到复杂 Web API 时需要确认行为是否足够接近真实浏览器。",
        "选择环境的核心不是哪个更高级，而是测试目标需要哪些 API。环境越贴近目标，测试越有意义。",
      ],
    },
    {
      heading: "按文件覆盖环境",
      body: [
        "同一个项目里可以同时存在 node 和 jsdom 测试。全局配置给出默认环境，少数特殊文件可以用注释覆盖。",
        "这种方式适合混合项目：大部分纯逻辑用 node，组件和 DOM 行为用 jsdom，避免所有测试都付出 DOM 环境成本。",
      ],
    },
  ],
  examples: [
    {
      title: "为组件测试配置 jsdom",
      code: `import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // 重点：组件测试需要 window、document 和 DOM 事件能力
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
})`,
      focusLines: [4, 5, 6],
    },
    {
      title: "在单个文件中覆盖测试环境",
      code: `// @vitest-environment node
import { expect, it } from 'vitest'
import { normalizePrice } from './pricing'

it('normalizes a raw price value', () => {
  // 重点：纯函数不需要 DOM，用 node 环境更轻
  expect(normalizePrice('12.50')).toBe(12.5)
})`,
      focusLines: [1, 6, 7],
    },
    {
      title: "DOM 测试需要浏览器式环境",
      code: `// @vitest-environment jsdom
import { expect, it } from 'vitest'

it('reads text from the document', () => {
  document.body.innerHTML = '<button>保存</button>'

  // 重点：document 只在 jsdom、happy-dom 或真实浏览器环境中可用
  expect(document.querySelector('button')?.textContent).toBe('保存')
})`,
      focusLines: [1, 5, 7, 8],
    },
  ],
  recap: [
    {
      question: "node 环境最适合测试什么？",
      answer:
        "适合测试纯函数、工具函数、数据转换和不依赖浏览器 API 的业务规则。",
    },
    {
      question: "React 组件测试为什么通常需要 jsdom？",
      answer:
        "组件渲染、DOM 查询、事件触发和表单交互需要 window、document、HTMLElement 等浏览器式 API。",
    },
    {
      question: "happy-dom 和 jsdom 应该如何选择？",
      answer:
        "优先看项目依赖的 Web API。jsdom 文档和生态更常见，happy-dom 更轻；复杂行为需要用测试验证兼容性。",
    },
    {
      question: "为什么不建议所有测试都默认用 DOM 环境？",
      answer:
        "DOM 环境成本更高，也可能掩盖纯逻辑测试的边界。能用 node 的测试保持 node 会更快、更清晰。",
    },
    {
      question: "单个测试文件如何覆盖环境？",
      answer:
        "可以在文件顶部使用 @vitest-environment 注释，例如 node、jsdom 或 happy-dom。",
    },
  ],
};
