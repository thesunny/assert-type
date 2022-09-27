/**
 * DESIGN:
 *
 * It's unusual to create capitalized function names; however, this was done
 * to aid readability.
 *
 * See the unit test at ./src/test/index.test.ts
 *
 * Here are the considerations for the design choices:
 *
 * - Capitalize namespace so it looks like generics which are capitalize.
 *   Visually organizes `AssertType` as dealing with types.
 * - Used a namespace with separate methods
 *   - To allow importing a single object from the package `AssertType`
 *     instead of multiple.
 *   - Improve readability by having the function name like `Equal` appear in
 *     a different color in VSCode
 * - Added inverse functions like `Equal` and `NotEqual` even though we could
 *   have changed the argument to be `true` or `false` to have the same effect
 *   to reduce change of a mistake. The argument therefore should **always**
 *   be true.
 * - Included only `Equal` and `NotEqual` and not tests like
 *   `AssertType.Number` because they seemed like they could be edited easier
 *   by using `AssertType.Equal`. For example, let's say we wanted to do
 *   `AssertType.Number` but instead later realized we wanted to constrain to
 *   3 specific numbers like 1, 2, and 3. We would have to switch the method
 *   call to `AssertType.Equal` if we had an `AssertType.Number`. Also opens
 *   the floodgate to possible function bloat when they aren't necessary.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AssertType {
  /**
   * If the two types are equal (either type can extends from the other type in
   * either direction) then return a type of `true` and otherwise a type of
   * `false`
   *
   * <https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-509504856>
   *
   * Use this to check for type equality
   *
   * const a: IsEqual<{a: string}, {a: string}> = true
   * const a: IsEqual<{a: string}, {a: number}> = false
   *
   * Which in this case will show an error
   */
  // prettier-ignore
  export type IsEqual<A, B, Y = true, N = false> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? Y : N

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function Equal<A, B>(value: IsEqual<A, B>): void {
    /* noop */
  }

  export function NotEqual<A, B>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: IsEqual<A, B> extends true ? false : true
  ): void {
    /* noop */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function Extends<A, B>(value: A extends B ? true : false): void {
    /* noop */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function NotExtends<A, B>(value: A extends B ? false : true): void {
    /* noop */
  }
}
