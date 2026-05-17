import type { RecapItem } from '../types/course'

type RecapProps = {
  items: RecapItem[]
  completed: boolean
  onComplete: () => void
}

export function Recap({ items, completed, onComplete }: RecapProps) {
  return (
    <article className="recap">
      <h2>本课复盘</h2>
      <div className="recap-list">
        {items.map((item, index) => (
          <details className="recap-item" key={item.question}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="recap-actions">
        <button
          className="complete-button"
          type="button"
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? '已完成' : '标记完成'}
        </button>
      </div>
    </article>
  )
}
