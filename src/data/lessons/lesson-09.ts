import type { Course } from "../../types/course";

export const lesson09: Course = {
  id: "lesson-09",
  title: "15. 快照测试",
  level: "进阶",
  summary: "用快照固定复杂输出，同时避免把快照当作万能断言。",
  sections: [
    {
      heading: "快照适合什么",
      body: [
        "快照适合稳定但结构较大的输出，例如序列化后的配置、错误对象、生成的文档片段或复杂 UI 结构。",
        "它的优势是快速发现整体输出变化。缺点是变更原因不一定清楚，读者必须认真审查快照 diff。",
      ],
    },
    {
      heading: "不要滥用快照",
      body: [
        "如果一个结果可以用一两个明确 matcher 表达，就不要使用大快照。明确断言比快照更容易告诉你业务承诺是什么。",
        "巨大的组件快照往往很脆弱，className、属性顺序或无关结构变化都会产生大量 diff，降低团队信任。",
      ],
    },
    {
      heading: "更新快照要像改代码一样审查",
      body: [
        "快照失败不代表一定要更新，也可能是真 bug。更新前先确认输出变化是否符合预期，再提交新的快照。",
        "快照文件应该进入代码评审。不要把“更新快照”当成清理失败测试的快捷键。",
      ],
    },
  ],
  examples: [
    {
      title: "内联快照适合小输出",
      code: `import { expect, it } from 'vitest'
import { buildConfig } from './buildConfig'

it('builds the default config', () => {
  expect(buildConfig()).toMatchInlineSnapshot({
    generatedAt: expect.any(String)
  }, \`
{
  "mode": "test",
  "retry": 0
}
\`)
})`,
      focusLines: [5, 6],
    },
    {
      title: "能明确断言时不要用快照",
      code: `it('shows completed text', () => {
  render(<CompletionButton completed />)

  expect(screen.getByRole('button', { name: '已完成' })).toBeDisabled()
})`,
      focusLines: [4],
    },
  ],
  recap: [
    {
      question: "快照测试最适合什么输出？",
      answer:
        "适合稳定但结构较大的输出，例如配置、序列化数据、错误对象或生成内容。",
    },
    {
      question: "为什么巨大 UI 快照容易变成负担？",
      answer:
        "它会因为无关结构变化产生大量 diff，读者难以判断变化是否真的影响用户行为。",
    },
    {
      question: "快照失败后应该直接更新吗？",
      answer:
        "不应该。先确认输出变化是否符合预期，排除 bug 后再更新并审查快照 diff。",
    },
    {
      question: "什么时候明确 matcher 比快照更好？",
      answer:
        "当结果可以用少量断言表达时，明确 matcher 更能体现业务承诺，也更容易定位失败原因。",
    },
  ],
};
