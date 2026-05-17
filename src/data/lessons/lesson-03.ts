import type { Course } from "../../types/course";

export const lesson03: Course = {
  id: "lesson-03",
  title: "03. 编写第一个测试",
  level: "基础",
  summary: "用 describe、it、expect 写出清晰的单元测试，并理解测试失败信息。",
  sections: [
    {
      heading: "测试从行为开始",
      body: [
        "单元测试不是把实现过程重新写一遍，而是描述一个输入在某个业务规则下应该得到什么结果。测试名应该让读者知道行为，而不是知道函数内部怎么做。",
        "一个好的测试通常包含三个阶段：准备输入、执行动作、断言结果。阶段越清楚，失败后定位问题越快。",
      ],
    },
    {
      heading: "describe 和 it 的职责",
      body: [
        "describe 用来组织一组相关场景，例如一个函数、一个业务模块或一个组件状态。it 或 test 用来描述一个具体行为。",
        "不要为了嵌套而嵌套。层级太深会让测试标题变得难读，也容易隐藏真正重要的输入条件。",
      ],
    },
    {
      heading: "断言粒度",
      body: [
        "一个测试可以有多个断言，但它们应该服务同一个行为。如果一个测试同时验证成功、失败、边界和副作用，失败时会很难判断哪个承诺被破坏。",
        "先写最能代表业务结果的断言，再补边界。不要断言中间变量、内部调用次数或临时实现，除非它们就是当前测试的目标。",
      ],
    },
  ],
  examples: [
    {
      title: "清晰的单元测试结构",
      code: `import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats cents as a USD price', () => {
    const result = formatPrice(1299)

    expect(result).toBe('$12.99')
  })
})`,
      focusLines: [4, 5, 8],
    },
    {
      title: "用边界测试保护规则",
      code: `it('returns free when price is zero', () => {
  const result = formatPrice(0)

  expect(result).toBe('Free')
})

it('throws when price is negative', () => {
  expect(() => formatPrice(-1)).toThrow('price must be positive')
})`,
      focusLines: [1, 7, 8],
    },
  ],
  recap: [
    {
      question: "一个基础单元测试通常分成哪三个阶段？",
      answer:
        "准备输入、执行动作、断言结果。这个结构能让测试意图和失败位置更清楚。",
    },
    {
      question: "describe 和 it 分别负责什么？",
      answer:
        "describe 组织相关场景，it 描述一个具体行为。测试标题应该合起来像一句可读的业务说明。",
    },
    {
      question: "为什么不建议断言中间变量？",
      answer:
        "中间变量通常是实现细节。测试绑定实现细节后，重构代码时即使用户可见行为没变，测试也可能失败。",
    },
    {
      question: "什么时候应该拆成多个测试？",
      answer:
        "当一个测试同时验证多个独立行为，或者失败时很难判断哪个业务承诺被破坏时，就应该拆开。",
    },
  ],
};
