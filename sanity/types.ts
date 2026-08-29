/**
 * Minimal stand in for Sanity's validation Rule type.
 *
 * These schemas are written to be dropped straight into a Sanity Studio without
 * pulling the Studio packages into this app's dependency tree. Once the Studio
 * exists, swap this import for `import type { Rule } from "sanity"` and delete
 * this file.
 */
export type Rule = {
  required: () => Rule;
  min: (n: number) => Rule;
  max: (n: number) => Rule;
};
