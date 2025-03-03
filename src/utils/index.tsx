import { isArray } from "./validate"

/**
 * 深度克隆一个对象或数组。
 * 该函数会递归地复制对象或数组中的所有元素，
 * 确保新对象与原对象完全独立。
 *
 * @template T - 要克隆的对象或数组的类型
 * @param val - 要克隆的对象或数组
 * @returns 返回一个深度克隆的新对象或数组
 */
export function cloneDeep<T>(val: T): T {
  if (val === null || typeof val !== 'object') {
    return val
  }

  if (isArray(val)) {
    const arrCopy: T[] = []
    for (let i = 0; i < val.length; i++) {
      arrCopy[i] = cloneDeep(val[i])
    }
    return arrCopy as T
  }

  const objCopy: { [key: string]: any } = {}
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      objCopy[key] = cloneDeep(val[key])
    }
  }
  return objCopy as T
}