export function handleArray<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => void,
): void {
  array.forEach(callback)
}

export function handleObject<T>(
  object: T,
  callback: (value: T[keyof T], key: keyof T, object: T) => void,
): void {
  Object.entries(object).forEach(([key, value]) =>
    callback(value as T[keyof T], key as keyof T, object),
  )
}

export function handleArrayObject<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => void,
): void {
  array.forEach((item, index) => callback(item, index, array))
}

export function handleObjectObject<T>(
  object: T,
  callback: (value: T[keyof T], key: keyof T, object: T) => void,
): void {
  Object.entries(object).forEach(([key, value]) =>
    callback(value, key as keyof T, object),
  )
}

export function handleAppendData<T>(
  appendData: T[],
  callback: (item: T) => void,
): void {
  appendData.forEach(callback)
}
