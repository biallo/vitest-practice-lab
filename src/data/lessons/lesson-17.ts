import type { Course } from "../../types/course";

export const lesson17: Course = {
  id: "lesson-17",
  title: "17. CI 与报告",
  level: "工程化",
  summary: "在 GitHub Actions 中运行测试，输出稳定日志并保留诊断信息。",
  sections: [
    {
      heading: "CI 的目标是稳定反馈",
      body: [
        "CI 中的测试应该可重复、可结束、日志足够清楚。它不是本地 watch 模式的替代品，而是每次提交后的质量闸门。",
        "Node 版本、包管理器、时区、环境变量和操作系统都可能让 CI 与本地表现不同。把这些条件写进 workflow，才能减少随机失败。",
      ],
    },
    {
      heading: "使用 npm ci 和锁文件",
      body: [
        "CI 中推荐使用 npm ci，它会严格按 package-lock.json 安装依赖，并在 lockfile 与 package.json 不一致时报错。",
        "依赖缓存应该缓存包管理器缓存，而不是缓存 node_modules。node_modules 缓存容易掩盖安装问题。",
      ],
    },
    {
      heading: "报告与排查",
      body: [
        "失败日志要让读者能快速看到哪个文件、哪个测试、哪个断言失败。必要时可以增加 reporter、coverage 或上传 artifact。",
        "如果某些测试只在 CI 失败，优先检查并发、时区、未声明环境变量、文件系统大小写和真实网络依赖。",
      ],
    },
  ],
  examples: [
    {
      title: "GitHub Actions 中运行 Vitest",
      code: `name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run test:run`,
      focusLines: [12, 14, 15],
    },
    {
      title: "本地复现 CI 命令",
      code: `npm ci
npm run lint
npm run test:run
npm run build`,
      focusLines: [3, 4],
    },
  ],
  recap: [
    {
      question: "为什么 CI 推荐 npm ci？",
      answer:
        "npm ci 会严格按照 lockfile 安装依赖，保证 CI 环境可复现，并能及时发现锁文件不一致。",
    },
    {
      question: "CI 中为什么应该运行 test:run 而不是 test？",
      answer:
        "test:run 是一次性运行，会自然结束；test 常用于 watch 模式，可能让 CI 一直等待。",
    },
    {
      question: "CI 偶发失败常见原因有哪些？",
      answer:
        "并发竞争、时区差异、环境变量缺失、文件系统大小写、真实网络依赖和本地未提交文件。",
    },
    {
      question: "为什么不建议缓存 node_modules？",
      answer:
        "node_modules 缓存可能掩盖安装问题。更稳妥的是缓存包管理器缓存，再用 npm ci 重建依赖。",
    },
    {
      question: "失败日志和 artifact 的价值是什么？",
      answer:
        "它们能帮助回看失败现场，快速定位哪个测试、断言、覆盖率或截图暴露了问题。",
    },
  ],
};
