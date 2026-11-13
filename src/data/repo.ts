import { courses } from "./courses";
import type { Course, Lesson } from "./types";

// Única puerta de acceso a los datos. En el sprint 2 se reemplaza por una
// implementación sobre Supabase con la misma interfaz.
export interface CampusRepo {
  listCourses(): Course[];
  getCourse(slug: string): Course | undefined;
  getLesson(courseSlug: string, lessonSlug: string): { course: Course; lesson: Lesson; index: number } | undefined;
}

export const repo: CampusRepo = {
  listCourses: () => courses,
  getCourse: (slug) => courses.find((c) => c.slug === slug),
  getLesson: (courseSlug, lessonSlug) => {
    const course = courses.find((c) => c.slug === courseSlug);
    if (!course) return undefined;
    const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
    const lesson = course.lessons[index];
    if (!lesson) return undefined;
    return { course, lesson, index };
  },
};
