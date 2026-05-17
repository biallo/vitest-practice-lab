import type { Course } from "../../types/course";

export const lesson04: Course = {
  id: "lesson-04",
  title: "04. Matchers",
  level: "基础",
  summary:
    "掌握 toBe、toEqual、toThrow、resolves 等断言，并选择合适的 matcher。",
  sections: [
    {
      heading: "matcher 是测试语言",
      body: [
        "expect 负责接收实际值，matcher 负责表达期望。选择合适的 matcher，会让测试失败信息更贴近问题本身。",
        "Vitest 内置 Chai 断言，并提供兼容 Jest expect 的 API。对于多数前端项目，直接使用 expect(...).toBe(...) 这一类写法最容易统一团队风格。",
      ],
    },
    {
      heading: "toBe 与 toEqual",
      body: [
        "toBe 使用严格相等，适合数字、字符串、布尔值、null、undefined 或同一个引用。对象和数组通常不该用 toBe。",
        "toEqual 会递归比较结构，适合对象、数组和嵌套数据。对于业务对象，更推荐断言关键字段，而不是盲目比较一个巨大对象。",
      ],
    },
    {
      heading: "异步和错误断言",
      body: [
        "测试 Promise 时可以使用 resolves 和 rejects，让断言表达异步结果，而不是手写 try/catch 混淆测试意图。",
        "测试抛错时，要把函数调用包在回调里传给 expect。否则错误会在断言之前抛出，matcher 根本没有机会捕获它。",
      ],
    },
  ],
  examples: [
    {
      title: "对象断言使用 toEqual",
      code: `import { expect, it } from 'vitest'

it('builds a lesson summary', () => {
  const summary = {
    id: 'lesson-04',
    completed: false
  }

  expect(summary).toEqual({
    id: 'lesson-04',
    completed: false
  })
})`,
      focusLines: [9],
    },
    {
      title: "异步与错误断言",
      code: `it('loads the current user', async () => {
  await expect(fetchUser('u-1')).resolves.toEqual({
    id: 'u-1',
    name: 'Ada'
  })
})

it('rejects invalid ids', async () => {
  await expect(fetchUser('')).rejects.toThrow('user id is required')
})`,
      focusLines: [2, 9],
    },
  ],
  recap: [
    {
      question: "toBe 和 toEqual 的核心区别是什么？",
      answer:
        "toBe 比较严格相等，适合基本值或同一引用；toEqual 比较结构，适合对象和数组。",
    },
    {
      question: "为什么测试抛错时要传函数给 expect？",
      answer:
        "如果直接调用函数，错误会在 expect 执行前抛出。传入回调后，matcher 才能捕获并判断这个错误。",
    },
    {
      question: "resolves 和 rejects 解决什么问题？",
      answer:
        "它们让 Promise 的成功和失败路径直接进入断言语义，减少手写 try/catch 造成的噪音。",
    },
    {
      question: "为什么 matcher 的选择会影响维护性？",
      answer:
        "合适的 matcher 会产生更明确的失败信息，也能让读者直接看出测试验证的是值、结构、错误还是异步结果。",
    },
  ],
};
