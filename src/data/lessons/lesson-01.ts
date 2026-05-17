import type { Course } from "../../types/course";

export const lesson01: Course = {
  id: "lesson-01",
  title: "01. 认识 Vitest",
  level: "入门",
  summary: "理解 Vitest 解决的问题、核心能力和第一个测试文件的写法。",
  sections: [
    {
      heading: "Vitest 是什么",
      body: [
        "Vitest 是一个面向现代 JavaScript 和 TypeScript 项目的测试框架。它复用 Vite 的配置、插件、模块解析和开发体验，因此在 Vite 项目里写测试时，代码转换、路径别名、ESM 依赖和框架插件更接近真实应用运行方式。",
        "它适合希望测试反馈快、配置接近应用构建链路、并且需要兼容 Jest 风格 API 的前端项目。",
      ],
    },
    {
      heading: "它主要解决什么问题",
      body: [
        "Vitest 利用 Vite 的按需转换和依赖处理，测试反馈通常更短，适合频繁运行。测试文件可以直接写 TS/TSX，并共享项目里的路径别名和转换规则。",
        "它提供 describe、it、expect、vi 等熟悉 API，同时支持 watch、mock、snapshot、coverage、browser mode、workspace 等工程能力。",
      ],
    },
    {
      heading: "学习路线",
      body: [
        "先掌握断言和异步测试，再学习 mock、组件测试和覆盖率。等基础稳定后，再处理浏览器模式、项目拆分和 CI 报告。",
        "学习时要优先关注测试表达的业务行为，而不是为了覆盖代码而机械补断言。测试应该帮助你更快发现行为变化。",
      ],
    },
  ],
  examples: [
    {
      title: "第一个测试文件",
      code: `import { describe, expect, it } from 'vitest'
import { calculateDiscount } from './pricing'

describe('calculateDiscount', () => {
  // 重点：it 的描述要写用户可理解的行为，而不是实现细节
  it('caps VIP discount at 30%', () => {
    const finalPrice = calculateDiscount({ price: 100, coupon: 'VIP' })

    // 重点：断言应该落在业务结果上，而不是中间变量上
    expect(finalPrice).toBe(70)
  })
})`,
      focusLines: [5, 9, 10],
    },
    {
      title: "常用配置长什么样",
      code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // 重点：React 组件测试通常需要浏览器式 DOM 环境
    environment: 'jsdom',
    // 重点：setupFiles 适合放扩展 matcher 和全局测试准备
    setupFiles: './src/test/setup.ts'
  }
})`,
      focusLines: [6, 8, 10],
    },
  ],
  recap: [
    {
      question: "Vitest 最适合解决哪类项目的测试问题？",
      answer:
        "Vitest 适合现代 JavaScript 和 TypeScript 项目，尤其是已经使用 Vite、ESM、React 或其他现代前端框架的项目。",
    },
    {
      question: "为什么说 Vitest 和 Vite 项目的运行环境更一致？",
      answer:
        "因为 Vitest 复用 Vite 的配置、插件、模块解析和依赖转换能力，测试里的路径别名、TS/TSX 转换和框架插件更接近应用真实运行方式。",
    },
    {
      question: "第一个测试文件通常从哪三个 API 开始？",
      answer:
        "通常从 describe、it 和 expect 开始。describe 组织测试场景，it 描述一个具体行为，expect 负责断言最终结果。",
    },
    {
      question: "从 Jest 迁移到 Vitest 时，第一步应该关注什么？",
      answer:
        "先关注断言、mock、覆盖率和测试环境配置的差异，优先让已有测试可运行，再逐步处理更细的行为差异。",
    },
  ],
};
