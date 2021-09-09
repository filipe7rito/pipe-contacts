/**
 * Helper type to achieve flexible nominal typing
 *
 * @example
 * ```
 * type WeightKg = Flavor<number, "WeightKg">;
 * type WeightGrams = Flavor<number, "WeightGrams">;
 *
 * const kgs: WeightKg = 10;
 * const grams: WeightGrams = kgs; // Will fail with an error
 * ```
 *
 * @see https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
 */
type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;
type Flavoring<FlavorT> = { _type?: FlavorT };

/**
 * Helper type to get values of an array as a string type
 *
 * @example
 * ```
 * // using valuesof yields a union type of its values
 * type FoodTypes = ValuesOf<['pizza', 'burguer', 'pasta']>;
 * type FoodTypes = 'pizza' | 'burger' | 'pasta'; // same as above
 * ```
 */
type ValuesOf<T extends any[]> = T[number];

/**
 * Helper type to get all the required properties of an object
 *
 * @example
 * ```
 * type MyType = {
 * 	optional?: string,
 * 	required: string
 * }
 *
 * type Required = RequiredKeys<MyType>; // will equal to 'required'
 * ```
 *
 * @see https://github.com/piotrwitek/utility-types
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Helper type of get the return type of a promise
 *
 * It differs from the standard lib ReturnType helper type in that it unpacks
 * the Promise to return the value the promise will return.
 *
 * @example
 * ```
 * type GetDate = () => Promise<Date>;
 *
 * type Returns = ReturnType<GetDate> // Promise<Date>
 * type ReturnsAsync = AsyncReturnType<GetDate> // Date
 * ```
 *
 * @see https://jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript
 */
type AsyncReturnType<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

/** Type alias to review nasty places we left as part of refactoring */
type Hack = any;
