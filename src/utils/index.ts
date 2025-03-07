import Taro from '@tarojs/taro'
import { isArray, isObject, isString } from './validate'

type ShowToastProps = String | Taro.showToast.Option

/**
 * 判断当前是否为开发环境
 * @returns {boolean} 如果是开发环境返回 true，否则返回 false
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * 判断当前是否为生产环境
 * @returns {boolean} 如果是生产环境返回 true，否则返回 false
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

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

/**
 * 展示提示信息框
 * @param {ShowToastProps} res 文本 或 传递一个对象
 * @param {Boolean} mask 是否显示透明遮罩层，屏蔽用户操作
 */
export function showToast(res: ShowToastProps, mask = false) {
  Taro.hideLoading()
  Taro.showToast({
    title: isString(res) ? res : '',
    duration: 1500,
    icon: 'none',
    mask: !!mask,
    ...(isObject(res) ? res : {})
  })
}

/**
 * 打印耗时
 * @param {String} msg 打印文本前缀
 * @param {Date} start 开始时间
 * @param {Date} end 结束时间
 */
export function printTimeConsuming(msg: String, start: Date, end: Date) {
  console.log(`${msg} 耗时：${end.getTime() - start.getTime()}ms`)
}

/**
 * 将对象拼接到URL的查询字符串中
 * @param {string} url 基础URL
 * @param {Object} params 查询参数对象，属性值为空时不拼接
 * @returns 拼接后的完整URL
 */
export function appendQueryParams(url: string, params?: Object) {
  if (!params || !isObject(params)) {
    return url
  }

  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key]
      if (value === null || value === undefined) {
        return ''
      }
      return `${key}=${value}`
    })
    .filter(Boolean)
    .join('&')

  if (queryString) {
    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`
  }

  return url
}

/**
 * 解析URL中的查询参数
 * @param {String} url 完整URL
 * @returns 包含查询参数的对象
 */
export function parseQueryParams(url: string) {
  const queryParams = {}
  const urlObj = new URL(url)
  urlObj.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })
  return queryParams
}

/**
 * 解析URL并返回包含url和params属性的对象
 * @param {String} fullUrl 完整URL
 * @returns {Object} 包含url和params属性的对象
 */
export function parseUrlAndParams(fullUrl: string) {
  const queryIndex = fullUrl.indexOf('?')
  let url = fullUrl
  let queryString = ''

  if (queryIndex !== -1) {
    url = fullUrl.substring(0, queryIndex)
    queryString = fullUrl.substring(queryIndex + 1)
  }

  const params = {}
  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      if (key) {
        params[key] = value || ''
      }
    })
  }

  return {
    url: url,
    params: params
  }
}
