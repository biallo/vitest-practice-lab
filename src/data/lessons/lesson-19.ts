import type { Course } from "../../types/course";

export const lesson19: Course = {
  id: "lesson-19",
  title: "05. 数据驱动测试",
  level: "进阶",
  summary: "使用 test.each 覆盖多组输入输出，让边界用例更集中、更容易维护。",
  sections: [
    {
      heading: "为什么使用表格",
      body: [
        "当同一段业务规则需要验证多组输入输出时，数据驱动测试能减少重复结构，把注意力集中到用例数据本身。",
        "它特别适合价格计算、权限判断、状态映射、格式化函数和边界值验证。",
      ],
    },
    {
      heading: "命名要可读",
      body: [
        "表格测试失败时，测试名称应该能直接说明是哪组输入出错。不要只写 works，而要把关键参数放进名称里。",
        "如果参数超过两三个，使用对象表格通常比数组表格更清晰。",
      ],
    },
    {
      heading: "覆盖边界",
      body: [
        "数据驱动测试不等于把所有可能值都列出来。好的表格应该覆盖正常值、边界值、非法值和业务上特别重要的分支。",
        "每新增一行数据都应该回答一个问题：它保护了哪条规则，或曾经防止哪类回归。",
      ],
    },
  ],
  examples: [
    {
      title: "用 test.each 覆盖价格边界",
      code: `import { describe, expect, test } from 'vitest'
import { calculateDiscount } from './pricing'

describe('calculateDiscount', () => {
  test.each([
    // 重点：每一行代表一个明确业务边界
    { price: 100, coupon: 'NONE', expected: 100 },
    { price: 100, coupon: 'VIP', expected: 70 },
    { price: 80, coupon: 'NEW_USER', expected: 60 }
  ])('coupon $coupon changes $price to $expected', ({ price, coupon, expected }) => {
    expect(calculateDiscount({ price, coupon })).toBe(expected)
  })
})`,
      focusLines: [5, 6, 7, 8, 9, 10, 11],
    },
    {
      title: "对象表格让权限测试更清楚",
      code: `import { expect, test } from 'vitest'
import { canEditLesson } from './permissions'

test.each([
  { role: 'owner', completed: false, expected: true },
  { role: 'member', completed: false, expected: true },
  { role: 'member', completed: true, expected: false },
  { role: 'guest', completed: false, expected: false }
])('$role completed=$completed edit=$expected', (row) => {
  // 重点：对象字段让断言含义比数组下标更清楚
  expect(canEditLesson(row)).toBe(row.expected)
})`,
      focusLines: [4, 5, 6, 7, 8, 9, 10, 11],
    },
  ],
  recap: [
    {
      question: "数据驱动测试适合什么场景？",
      answer:
        "适合同一规则有多组输入输出的场景，例如计算、格式化、权限、状态映射和边界值验证。",
    },
    {
      question: "为什么测试名称里要带关键参数？",
      answer: "失败时可以直接看出是哪组数据出错，减少排查成本。",
    },
    {
      question: "数组表格和对象表格如何选择？",
      answer:
        "参数少且含义明显时数组表格简洁；参数多或字段含义重要时对象表格更可读。",
    },
    {
      question: "好的表格数据应该覆盖什么？",
      answer:
        "应该覆盖正常值、边界值、非法值和关键业务分支，而不是机械枚举所有值。",
    },
    {
      question: "每新增一行测试数据前应该问什么？",
      answer: "应该问它保护了哪条规则，是否覆盖新的边界或曾经出现过的回归。",
    },
  ],
};
