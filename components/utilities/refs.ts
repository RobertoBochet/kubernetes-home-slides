/**
 * Resolves an object of refs into the same keys holding plain values.
 *
 * Returns `undefined` unless every ref is populated: the caller checks once and works afterwards
 * with values, instead of repeating `?.` on each use. Accepts anything with a `value`, so it takes
 * `ref()`, `shallowRef()` and the readonly ref of `useTemplateRef` alike.
 *
 * `undefined` and `null` are both treated as missing: a template ref is `null` before mount; a
 * `ref<T>()` is `undefined`.
 */
export const resolveRefs = <R extends Record<string, { readonly value: unknown }>>(
  refs: R
): { [K in keyof R]: NonNullable<R[K]["value"]> } | undefined => {
  const resolved = {} as { [K in keyof R]: NonNullable<R[K]["value"]> }

  for (const key of Object.keys(refs) as (keyof R)[]) {
    const value = refs[key].value
    if (value === undefined || value === null) return undefined
    resolved[key] = value
  }

  return resolved
}
