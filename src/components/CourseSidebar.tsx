import type { RefObject } from 'react'
import type { Course } from '../types/course'

type CourseSidebarProps = {
  courses: Course[]
  activeLessonId: string
  completedLessonSet: Set<string>
  completedCount: number
  progressPercent: number
  navRef: RefObject<HTMLDivElement | null>
  lessonButtonRefs: RefObject<Record<string, HTMLButtonElement | null>>
  onSelect: (lessonId: string) => void
}

const assetBase = import.meta.env.BASE_URL

export function CourseSidebar({
  courses,
  activeLessonId,
  completedLessonSet,
  completedCount,
  progressPercent,
  navRef,
  lessonButtonRefs,
  onSelect,
}: CourseSidebarProps) {
  return (
    <aside className="course-sidebar" aria-label="Vitest 课程列表">
      <div className="brand">
        <div className="brand-heading">
          <img
            src={`${assetBase}vitest-icons/logo-without-border.svg`}
            width="38"
            height="38"
            alt=""
          />
          <div>
            <span className="brand-name">Vitest </span>
            <span>Practice Lab</span>
          </div>
        </div>

        <div
          className="progress-summary"
          aria-label={`课程完成进度 ${completedCount}/${courses.length}`}
        >
          <div className="progress-track" aria-hidden="true">
            <div style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="progress-meta">
            <span>已完成{completedCount}/{courses.length}</span>
            <span>{progressPercent}% </span>
          </div>
        </div>
      </div>

      <label className="mobile-course-picker" htmlFor="course-select">
        <span>当前课程</span>
        <select
          id="course-select"
          value={activeLessonId}
          onChange={(event) => onSelect(event.target.value)}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </label>

      <div ref={navRef} className="course-list" role="list">
        {courses.map((course) => {
          const isCompleted = completedLessonSet.has(course.id)

          return (
            <button
              key={course.id}
              ref={(node) => {
                lessonButtonRefs.current[course.id] = node
              }}
              className={[
                course.id === activeLessonId ? 'active' : '',
                isCompleted ? 'completed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              type="button"
              onClick={() => onSelect(course.id)}
              role="listitem"
            >
              <span>{course.title}</span>
              <small>{isCompleted ? '已完成' : course.level}</small>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
