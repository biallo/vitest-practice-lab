import type { Course } from "../../types/course";

export const lesson02: Course = {
  id: "lesson-02",
  title: "02. 安装与脚本",
  level: "基础",
  summary: "安装 Vitest，理解 watch/run 模式，并把测试脚本接入 package.json。",
  sections: [
    {
      heading: "安装依赖",
      body: [
        "在 Vite 项目中，Vitest 通常作为 devDependency 安装。官方文档要求 Vitest 4 运行在 Vite 6+ 和 Node 20+ 之上，所以 CI 和本地 Node 版本要一起确认。",
        "不要依赖全局安装的 vitest。把它写进 package.json 可以让团队、CI 和编辑器插件使用同一份版本，减少“我本地能跑”的环境差异。",
      ],
    },
    {
      heading: "watch 和 run 的差异",
      body: [
        "直接运行 vitest 时，开发环境默认进入 watch 模式。它会根据模块图，仅重跑受影响的相关测试，适合边写代码边获得反馈。",
        "vitest run 是一次性运行，适合 CI、提交前检查和生成稳定报告。开发脚本和 CI 脚本应该分开命名，避免 CI 卡在 watch 模式。",
      ],
    },
    {
      heading: "脚本命名建议",
      body: [
        "推荐保留 test 给 watch 模式，把 test:run 留给一次性测试，把 coverage 单独命名。这样日常开发和自动化流程语义清楚。",
        "后续接入覆盖率、UI 或浏览器模式时，也应该继续用脚本表达意图，而不是让团队记一长串 CLI 参数。",
      ],
    },
  ],
  examples: [
    {
      title: "安装和常用脚本",
      code: `npm install -D vitest

{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage"
  }
}`,
      focusLines: [1, 5, 6],
    },
    {
      title: "在 Vite 配置中添加 test 配置",
      code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts']
  }
})`,
      focusLines: [6, 7, 8],
    },
  ],
  recap: [
    {
      question: "为什么 Vitest 应该安装到 devDependencies？",
      answer:
        "这样团队成员、CI 和编辑器插件都会使用项目锁定的版本，避免全局版本不一致导致测试结果不同。",
    },
    {
      question: "test 和 test:run 推荐分别做什么？",
      answer:
        "test 通常用于开发时 watch 模式，test:run 用于一次性运行，适合 CI 和提交前检查。",
    },
    {
      question: "为什么 CI 不应该直接运行 watch 模式？",
      answer:
        "watch 模式会等待文件变化，不会自然结束；CI 需要可结束、可复现的一次性命令。",
    },
    {
      question: "为什么脚本名称要表达运行意图？",
      answer:
        "脚本名称能让开发、覆盖率、CI 等流程语义清楚，团队不需要记忆一长串 CLI 参数。",
    },
  ],
};
