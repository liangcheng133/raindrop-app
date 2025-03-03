/**
 * 检查一个值是否为空。
 * 空值包括：null, undefined, 空字符串, 空数组, 空对象。
 *
 * @param val - 要检查的值
 * @returns 如果值为空，返回 true；否则返回 false
 */
export function isEmpty(val: any): boolean {
  if (val === null || val === undefined) {
    return true
  }
  if (typeof val === 'string' && val.trim() === '') {
    return true
  }
  if (Array.isArray(val) && val.length === 0) {
    return true
  }
  if (val instanceof Date) {
    return false
  }
  if (typeof val === 'object' && Object.keys(val).length === 0) {
    return true
  }
  return false
}

/**
 * 检查一个值是否不为空。
 * 非空值包括：非 null, 非 undefined, 非空字符串, 非空数组, 非空对象。
 *
 * @param val - 要检查的值
 * @returns 如果值不为空，返回 true；否则返回 false
 */
export function isNotEmpty(val: any): boolean {
  return !isEmpty(val)
}

/**
 * 检查一个值是否为布尔值。
 *
 * @param val - 要检查的值
 * @returns 如果值为布尔值，返回 true；否则返回 false
 */
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

/**
 * 检查一个值是否为数字。
 *
 * @param val - 要检查的值
 * @returns 如果值为数字，返回 true；否则返回 false
 */
export function isNumber(val: any): val is number {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * 检查一个值是否为字符串。
 *
 * @param val - 要检查的值
 * @returns 如果值为字符串，返回 true；否则返回 false
 */
export function isString(val: any): val is string {
  return typeof val === 'string'
}

/**
 * 检查一个值是否为数组。
 *
 * @param val - 要检查的值
 * @returns 如果值为数组，返回 true；否则返回 false
 */
export function isArray(val: any): val is any[] {
  return Array.isArray(val)
}

/**
 * 检查一个值是否为对象。
 *
 * @param val - 要检查的值
 * @returns 如果值为对象（且不是 null 或数组），返回 true；否则返回 false
 */
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

/**
 * 检查一个值是否为函数。
 *
 * @param val - 要检查的值
 * @returns 如果值为函数，返回 true；否则返回 false
 */
export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

/**
 * 检查一个值是否为日期对象。
 *
 * @param val - 要检查的值
 * @returns 如果值为日期对象，返回 true；否则返回 false
 */
export function isDate(val: any): val is Date {
  return val instanceof Date && !isNaN(val.getTime())
}

/**
 * 检查一个值是否为正则表达式。
 *
 * @param val - 要检查的值
 * @returns 如果值为正则表达式，返回 true；否则返回 false
 */
export function isRegExp(val: any): val is RegExp {
  return val instanceof RegExp
}

/**
 * 检查一个值是否为 Symbol。
 *
 * @param val - 要检查的值
 * @returns 如果值为 Symbol，返回 true；否则返回 false
 */
export function isSymbol(val: any): val is symbol {
  return typeof val === 'symbol'
}
