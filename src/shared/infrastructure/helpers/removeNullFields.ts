export function removeNullFields<T extends object>(
  obj: T,
): { [K in keyof T]: Exclude<T[K], null> } {
  let result = {} as { [K in keyof T]: Exclude<T[K], null> };

  for (let key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== null
    ) {
      result[key as keyof T] = obj[key] as Exclude<T[keyof T], null>;
    }
  }

  return result;
}
