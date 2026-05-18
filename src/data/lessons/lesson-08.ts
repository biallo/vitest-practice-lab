import type { Course } from "../../types/course";

export const lesson08: Course = {
  id: "lesson-08",
  title: "08. Vitest 配置深入",
  level: "进阶",
  summary: "理解 test 配置、匹配规则、全局准备和路径别名，让测试环境稳定可控。",
  sections: [
    {
      heading: "配置入口",
      body: [
        "Vitest 可以直接读取 Vite 配置，也可以使用独立的 vitest.config.ts。对于 Vite React 项目，把 test 配置放在 vite.config.ts 里通常最直接，因为插件、路径别名和依赖处理可以共享。",
        "当项目变大、测试配置明显多于构建配置，或者你需要给不同测试类型准备不同配置时，再拆出独立配置文件会更清晰。",
      ],
    },
    {
      heading: "文件匹配和排除",
      body: [
        "include 决定哪些文件会被 Vitest 当成测试文件，exclude 决定哪些路径永远不参与测试。默认匹配已经覆盖常见的 .test 和 .spec 文件，但真实项目经常需要排除 e2e、构建产物或生成代码。",
        "匹配规则越精确，CI 越稳定。不要让测试命令扫到无关目录，否则可能出现本地能跑、CI 却因为额外文件失败的情况。",
      ],
    },
    {
      heading: "全局准备",
      body: [
        "setupFiles 适合放每个测试文件运行前都需要的准备，例如扩展 DOM matcher、清理本地存储、安装 fetch polyfill 或统一 mock 浏览器 API。",
        "globals 可以让 describe、it、expect 不再手动 import，但团队项目里要谨慎启用。显式 import 的可读性更强，类型来源也更清楚。",
      ],
    },
  ],
  examples: [
    {
      title: "在 Vite 配置中添加 Vitest 设置",
      code: `import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {
    // 重点：只匹配单元测试和组件测试，避免误扫 e2e 用例
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // 重点：构建产物、报告和端到端测试目录不应该参与这条命令
    exclude: ['dist', 'coverage', 'e2e'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    clearMocks: true
  }
})`,
      focusLines: [11, 13, 15, 17, 18],
    },
    {
      title: "集中维护测试准备文件",
      code: `import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  // 重点：每个用例结束后恢复 mock，避免跨测试污染
  vi.restoreAllMocks()
  localStorage.clear()
})`,
      focusLines: [1, 5, 7, 8],
    },
  ],
  recap: [
    {
      question: "什么时候把 test 配置放在 vite.config.ts 更合适？",
      answer:
        "当测试和应用共用 Vite 插件、路径别名和转换规则时，放在 vite.config.ts 里更直接，也更不容易出现构建和测试配置不一致。",
    },
    {
      question: "include 和 exclude 分别解决什么问题？",
      answer:
        "include 控制哪些文件会被识别为测试文件，exclude 控制哪些路径必须跳过。它们一起保证测试命令只运行目标范围内的用例。",
    },
    {
      question: "setupFiles 适合放哪些内容？",
      answer:
        "适合放扩展 matcher、全局清理、polyfill、统一 mock 和测试环境准备，不适合放具体业务断言。",
    },
    {
      question: "为什么 clearMocks 或 restoreAllMocks 很重要？",
      answer:
        "它们能减少 mock 状态跨用例残留，让每个测试从干净状态开始，避免测试顺序影响结果。",
    },
    {
      question: "是否应该默认开启 globals？",
      answer:
        "不一定。globals 可以少写 import，但显式 import 更清楚，也更利于类型追踪。团队应根据代码风格统一选择。",
    },
  ],
};
