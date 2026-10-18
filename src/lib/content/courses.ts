import {
  bool,
  num,
  objArray,
  oneOf,
  optStr,
  readCollection,
  str,
  strArray,
} from '@/lib/content/mdx';

export const courseCategories = [
  'Software Engineering',
  'Web',
  'Mobile',
  'Embedded & IoT',
  'AI/ML',
  'DevOps',
  'Tools',
] as const;

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type CourseCategory = (typeof courseCategories)[number];
export type CourseLevel = (typeof courseLevels)[number];

export interface SyllabusModule {
  /** Mono label on the left of the row, e.g. "Week 1" or "Module 3". */
  label: string;
  title: string;
  points: string[];
}

export interface CourseFaqItem {
  question: string;
  answer: string;
}

export interface Course {
  slug: string;
  /** Course code shown in mono, e.g. ENG-101. */
  code: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  summary: string;
  /** Null until confirmed — rendered as a TODO marker, never guessed. */
  duration: string | null;
  schedule: string | null;
  price: string | null;
  format: string[];
  language: string;
  whoItsFor: string[];
  prerequisites: string[];
  whatYouBuild: string[];
  requirements: string[];
  syllabus: SyllabusModule[];
  faq: CourseFaqItem[];
  /** Slug from src/content/team.ts. */
  instructor: string;
  featured: boolean;
  order: number;
  body: string;
}

/**
 * The fields a course row needs. Course bodies are long, and a filterable
 * catalogue is a client component — sending only this keeps the MDX prose out
 * of the serialised payload.
 */
export interface CourseSummary {
  slug: string;
  code: string;
  title: string;
  summary: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string | null;
  format: string[];
}

export function toCourseSummary(course: Course): CourseSummary {
  return {
    slug: course.slug,
    code: course.code,
    title: course.title,
    summary: course.summary,
    category: course.category,
    level: course.level,
    duration: course.duration,
    format: course.format,
  };
}

function toSyllabus(data: Record<string, unknown>, where: string): SyllabusModule[] {
  return objArray(data, 'syllabus', where).map((module, index) => ({
    label: str(module, 'label', `${where} › syllabus[${index}]`),
    title: str(module, 'title', `${where} › syllabus[${index}]`),
    points: strArray(module, 'points', `${where} › syllabus[${index}]`),
  }));
}

function toFaq(data: Record<string, unknown>, where: string): CourseFaqItem[] {
  return objArray(data, 'faq', where, { required: false }).map((item, index) => ({
    question: str(item, 'question', `${where} › faq[${index}]`),
    answer: str(item, 'answer', `${where} › faq[${index}]`),
  }));
}

export function getAllCourses(): Course[] {
  return readCollection('courses')
    .map(({ slug, data, body }) => {
      const where = `courses/${slug}.mdx`;
      return {
        slug,
        code: str(data, 'code', where),
        title: str(data, 'title', where),
        category: oneOf(data, 'category', courseCategories, where),
        level: oneOf(data, 'level', courseLevels, where),
        summary: str(data, 'summary', where),
        duration: optStr(data, 'duration'),
        schedule: optStr(data, 'schedule'),
        price: optStr(data, 'price'),
        format: strArray(data, 'format', where),
        language: str(data, 'language', where),
        whoItsFor: strArray(data, 'whoItsFor', where),
        prerequisites: strArray(data, 'prerequisites', where),
        whatYouBuild: strArray(data, 'whatYouBuild', where),
        requirements: strArray(data, 'requirements', where),
        syllabus: toSyllabus(data, where),
        faq: toFaq(data, where),
        instructor: str(data, 'instructor', where),
        featured: bool(data, 'featured'),
        order: num(data, 'order', where),
        body,
      } satisfies Course;
    })
    .sort((a, b) => a.order - b.order);
}

export function getCourse(slug: string): Course | undefined {
  return getAllCourses().find((course) => course.slug === slug);
}

export function getFeaturedCourses(limit = 6): Course[] {
  const all = getAllCourses();
  const featured = all.filter((course) => course.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export function getCoursesBySlugs(slugs: string[]): Course[] {
  const all = getAllCourses();
  return slugs
    .map((slug) => all.find((course) => course.slug === slug))
    .filter((course): course is Course => course !== undefined);
}

/** Categories that actually have courses, in the canonical order. */
export function getUsedCategories(courses: readonly CourseSummary[]): CourseCategory[] {
  return courseCategories.filter((category) =>
    courses.some((course) => course.category === category),
  );
}

export function getUsedLevels(courses: readonly CourseSummary[]): CourseLevel[] {
  return courseLevels.filter((level) => courses.some((course) => course.level === level));
}
