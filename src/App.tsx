import { useEffect, useMemo, useRef, useState } from "react";
import { CourseSidebar } from "./components/CourseSidebar";
import { LessonTabs } from "./components/LessonTabs";
import { Recap } from "./components/Recap";
import { StructuredLesson } from "./components/StructuredLesson";
import { courses } from "./data/lessons";
import "./App.css";

const completedLessonsStorageKey = "vitest-practice-lab.completed-lessons";

function App() {
  const [activeLessonId, setActiveLessonId] = useState(getInitialLessonId);
  const [activeTab, setActiveTab] = useState<"lecture" | "recap">("lecture");
  const [completedLessonIds, setCompletedLessonIds] = useState(
    getCompletedLessonIds,
  );
  const lessonPanelRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lessonButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeLesson = useMemo(
    () => courses.find((course) => course.id === activeLessonId) ?? courses[0],
    [activeLessonId],
  );
  const completedLessonSet = useMemo(
    () => new Set(completedLessonIds),
    [completedLessonIds],
  );
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / courses.length) * 100);
  const activeLessonIsCompleted = completedLessonSet.has(activeLesson.id);

  useEffect(() => {
    const syncFromHash = () => {
      const nextLessonId = getLessonIdFromHash();
      if (nextLessonId) {
        setActiveLessonId(nextLessonId);
        setActiveTab("lecture");
      }
    };

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const activeButton = lessonButtonRefs.current[activeLessonId];

    if (!nav || !activeButton) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const buttonIsVisible =
      buttonRect.top >= navRect.top && buttonRect.bottom <= navRect.bottom;

    if (!buttonIsVisible) {
      activeButton.scrollIntoView({ block: "nearest" });
    }
  }, [activeLessonId]);

  useEffect(() => {
    lessonPanelRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeLessonId]);

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab("lecture");
    window.history.replaceState(null, "", `#${lessonId}`);
  };

  const markActiveLessonComplete = () => {
    if (activeLessonIsCompleted) {
      return;
    }

    const nextCompletedLessonIds = [...completedLessonIds, activeLesson.id];
    setCompletedLessonIds(nextCompletedLessonIds);
    localStorage.setItem(
      completedLessonsStorageKey,
      JSON.stringify(nextCompletedLessonIds),
    );
  };

  return (
    <div className="app-shell">
      <CourseSidebar
        courses={courses}
        activeLessonId={activeLessonId}
        completedLessonSet={completedLessonSet}
        completedCount={completedCount}
        progressPercent={progressPercent}
        navRef={navRef}
        lessonButtonRefs={lessonButtonRefs}
        onSelect={selectLesson}
      />

      <main ref={lessonPanelRef} className="lesson-panel">
        <header className="lesson-header">
          <div>
            <p className="eyebrow">{activeLesson.level}</p>
            <h1>{activeLesson.title}</h1>
            <p>{activeLesson.summary}</p>
          </div>
        </header>

        <LessonTabs activeTab={activeTab} onChange={setActiveTab} />

        <section className="tab-panel">
          {activeTab === "lecture" ? (
            <StructuredLesson
              sections={activeLesson.sections}
              examples={activeLesson.examples}
            />
          ) : (
            <Recap
              items={activeLesson.recap}
              completed={activeLessonIsCompleted}
              onComplete={markActiveLessonComplete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

function getCompletedLessonIds() {
  try {
    const savedValue = localStorage.getItem(completedLessonsStorageKey);
    const parsedValue = savedValue ? JSON.parse(savedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return Array.from(
      new Set(
        parsedValue.filter((lessonId): lessonId is string =>
          courses.some((course) => course.id === lessonId),
        ),
      ),
    );
  } catch {
    return [];
  }
}

function getInitialLessonId() {
  return getLessonIdFromHash() ?? courses[0].id;
}

function getLessonIdFromHash() {
  const lessonId = window.location.hash.replace("#", "");
  return courses.some((course) => course.id === lessonId) ? lessonId : null;
}

export default App;
