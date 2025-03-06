/**
 * class 类拼接
 * @param args 可以是字符串、对象或数组
 * @returns 拼接后的类名字符串
 */
export function cx(...args: (string | Boolean | Record<string, boolean> | string[])[]): string {
  const classes: string[] = []
  for (const arg of args) {
    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      classes.push(...arg.filter(Boolean))
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}
