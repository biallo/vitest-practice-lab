type LessonTabsProps = {
  activeTab: 'lecture' | 'recap'
  onChange: (tab: 'lecture' | 'recap') => void
}

export function LessonTabs({ activeTab, onChange }: LessonTabsProps) {
  return (
    <div className="tab-list" role="tablist" aria-label="课程内容">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'lecture'}
        className={activeTab === 'lecture' ? 'active' : undefined}
        onClick={() => onChange('lecture')}
      >
        讲解
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'recap'}
        className={activeTab === 'recap' ? 'active' : undefined}
        onClick={() => onChange('recap')}
      >
        复盘
      </button>
    </div>
  )
}
