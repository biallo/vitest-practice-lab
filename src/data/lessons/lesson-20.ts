import type { Course } from "../../types/course";

export const lesson20: Course = {
  id: "lesson-20",
  title: "20. 实战练习",
  level: "实战",
  summary:
    "为一个小型业务模块补齐测试，把安装、断言、异步、mock 和 CI 串起来。",
  sections: [
    {
      heading: "从纯规则开始",
      body: [
        "实战练习不要一上来就测整个页面。先找到核心业务规则，把它们抽成纯函数或小模块，用最快、最稳定的单元测试保护起来。",
        "例如课程学习应用里的完成进度、下一课推荐、是否允许标记完成，都可以先用纯函数测试覆盖。",
      ],
    },
    {
      heading: "再扩展到交互和边界",
      body: [
        "当纯规则稳定后，再测试组件交互：用户点击标记完成后按钮变灰、左侧进度增加、刷新后状态还在。",
        "涉及 localStorage、网络请求、时间或第三方 SDK 时，再使用 mock 控制边界。这样测试层次清晰，不会所有逻辑都堆在一个组件测试里。",
      ],
    },
    {
      heading: "完成标准",
      body: [
        "一个功能的测试完成标准不是覆盖所有代码行，而是覆盖核心承诺：用户能完成什么、异常时看到什么、状态如何保存、关键规则是否正确。",
        "最后把测试命令放进 CI，让每次提交都自动验证。测试只有持续运行，才能真正保护项目。",
      ],
    },
  ],
  examples: [
    {
      title: "先测试纯函数",
      code: `export function getProgress(completed: number, total: number) {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

test.each([
  [0, 12, 0],
  [3, 12, 25],
  [12, 12, 100]
])('completed=%i total=%i', (completed, total, expected) => {
  expect(getProgress(completed, total)).toBe(expected)
})`,
      focusLines: [1, 6, 11],
    },
    {
      title: "再测试用户交互",
      code: `it('marks the current lesson as completed', async () => {
  const user = userEvent.setup()
  render(<LessonPage initialLessonId="lesson-20" />)

  await user.click(screen.getByRole('tab', { name: '复盘' }))
  await user.click(screen.getByRole('button', { name: '标记完成' }))

  expect(screen.getByRole('button', { name: '已完成' })).toBeDisabled()
  expect(screen.getByText('1/20')).toBeInTheDocument()
})`,
      focusLines: [5, 6, 8, 9],
    },
  ],
  recap: [
    {
      question: "实战中为什么先测纯函数？",
      answer:
        "纯函数测试最快、最稳定，能先保护核心规则，再把信心扩展到组件、持久化和网络边界。",
    },
    {
      question: "什么时候应该写组件测试？",
      answer:
        "当你需要验证用户交互、界面状态变化、可访问行为或多个模块协作后的可见结果时。",
    },
    {
      question: "一个功能的测试完成标准是什么？",
      answer:
        "覆盖核心用户承诺和高风险分支，失败信息能定位问题，并且内部重构时测试不需要大改。",
    },
    {
      question: "为什么不要一开始就测试整个页面？",
      answer:
        "整页测试反馈慢、失败面大。先保护纯规则能更快定位问题，再逐步覆盖交互和边界。",
    },
    {
      question: "localStorage、网络和时间这类边界应该怎么测试？",
      answer:
        "把边界控制在明确位置，需要时用 mock 或 fake timers 隔离，让测试关注业务结果而不是外部环境。",
    },
    {
      question: "为什么测试要放进 CI？",
      answer:
        "CI 让每次提交都自动验证测试、构建和 lint，保证测试不是只在本地偶尔运行。",
    },
  ],
};
