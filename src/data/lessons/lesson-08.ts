import type { Course } from "../../types/course";

export const lesson08: Course = {
  id: "lesson-08",
  title: "16. 覆盖率",
  level: "进阶",
  summary:
    "理解 statements、branches、functions、lines 的含义，并合理使用覆盖率。",
  sections: [
    {
      heading: "覆盖率衡量什么",
      body: [
        "覆盖率报告告诉你哪些语句、分支、函数和代码行被测试执行过。它能发现明显遗漏，但不能证明测试质量一定高。",
        "100% 覆盖率也可能只是执行了代码却没有有效断言。覆盖率应该辅助你找风险区域，而不是替代测试设计。",
      ],
    },
    {
      heading: "分支覆盖率最容易暴露问题",
      body: [
        "语句覆盖只说明代码行被跑过，分支覆盖会检查 if/else、switch、三元表达式等不同路径是否都被执行。",
        "业务规则通常藏在分支里。比如优惠券有效和无效、登录和未登录、成功和失败，都是需要分别保护的路径。",
      ],
    },
    {
      heading: "设置阈值要保守",
      body: [
        "刚接入覆盖率时，不要直接设置过高阈值。先观察当前报告，找高风险且低覆盖的模块逐步补测试。",
        "阈值适合防止回退，而不是制造数字压力。长期维护时，可以对核心业务模块设置更高阈值，对胶水代码保持务实。",
      ],
    },
  ],
  examples: [
    {
      title: "运行覆盖率",
      code: `{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}`,
      focusLines: [3],
    },
    {
      title: "为分支补测试",
      code: `it('uses welcome discount for new users', () => {
  expect(getDiscount({ isNewUser: true })).toBe(10)
})

it('does not discount returning users', () => {
  expect(getDiscount({ isNewUser: false })).toBe(0)
})`,
      focusLines: [1, 5],
    },
  ],
  recap: [
    {
      question: "覆盖率能证明测试质量高吗？",
      answer:
        "不能。覆盖率只能说明代码被执行过，测试是否有价值还取决于断言是否覆盖了业务承诺和风险路径。",
    },
    {
      question: "为什么分支覆盖率很重要？",
      answer:
        "业务规则经常体现在条件分支里。分支覆盖率能提醒你成功、失败、边界等路径是否都被执行过。",
    },
    {
      question: "覆盖率阈值应该怎么设置？",
      answer:
        "先基于当前项目逐步提高，用来防止覆盖率回退；核心业务模块可以更严格，非关键胶水代码保持务实。",
    },
    {
      question: "为什么 100% 覆盖率也可能不可靠？",
      answer:
        "因为代码被执行过不代表断言有效。如果测试没有验证业务结果，覆盖率数字再高也保护不了行为。",
    },
    {
      question: "刚接入覆盖率时应该先做什么？",
      answer:
        "先观察报告，找高风险且低覆盖的模块补测试，而不是直接设置过高阈值制造压力。",
    },
  ],
};
