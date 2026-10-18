import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

/**
 * Reads MDX content from disk at build time. Every page that uses these
 * helpers is statically generated, so this never runs on a request.
 *
 * Frontmatter is untyped YAML, so each field goes through a small coercion
 * helper that throws with the offending filename. A typo in a course file
 * fails the build instead of rendering `undefined` on a live page.
 */

export interface RawDocument {
  slug: string;
  data: Record<string, unknown>;
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export function readCollection(collection: string): RawDocument[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(source);
      return {
        slug: file.replace(/\.mdx$/, ''),
        data: data as Record<string, unknown>,
        body: content.trim(),
      };
    });
}

/* -------------------------------------------------------------------------- */
/* Frontmatter coercion                                                        */
/* -------------------------------------------------------------------------- */

function fail(where: string, field: string, expected: string): never {
  throw new Error(
    `[content] ${where}: frontmatter field "${field}" must be ${expected}. ` +
      `Fix the file in src/content/ and rebuild.`,
  );
}

export function str(data: Record<string, unknown>, field: string, where: string): string {
  const value = data[field];
  if (typeof value !== 'string' || value.trim() === '')
    fail(where, field, 'a non-empty string');
  return (value as string).trim();
}

/** A string that is allowed to be absent or explicitly null (a pending TODO). */
export function optStr(data: Record<string, unknown>, field: string): string | null {
  const value = data[field];
  if (value === undefined || value === null || value === '') return null;
  return String(value).trim();
}

export function strArray(
  data: Record<string, unknown>,
  field: string,
  where: string,
  { required = true }: { required?: boolean } = {},
): string[] {
  const value = data[field];
  if (value === undefined || value === null) {
    if (required) fail(where, field, 'a list of strings');
    return [];
  }
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    fail(where, field, 'a list of strings');
  }
  return (value as string[]).map((item) => item.trim());
}

export function num(data: Record<string, unknown>, field: string, where: string): number {
  const value = data[field];
  if (typeof value !== 'number' || Number.isNaN(value)) fail(where, field, 'a number');
  return value as number;
}

export function bool(data: Record<string, unknown>, field: string): boolean {
  return data[field] === true;
}

export function oneOf<const T extends readonly string[]>(
  data: Record<string, unknown>,
  field: string,
  allowed: T,
  where: string,
): T[number] {
  const value = str(data, field, where);
  if (!allowed.includes(value)) fail(where, field, `one of: ${allowed.join(', ')}`);
  return value as T[number];
}

/** Nested list-of-objects, used for syllabus modules and per-document FAQs. */
export function objArray(
  data: Record<string, unknown>,
  field: string,
  where: string,
  { required = true }: { required?: boolean } = {},
): Record<string, unknown>[] {
  const value = data[field];
  if (value === undefined || value === null) {
    if (required) fail(where, field, 'a list of objects');
    return [];
  }
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== 'object' || item === null || Array.isArray(item))
  ) {
    fail(where, field, 'a list of objects');
  }
  return value as Record<string, unknown>[];
}
