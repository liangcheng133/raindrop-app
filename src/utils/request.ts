import Taro from '@tarojs/taro'
import { cloneDeep, showToast } from '.'

interface RequestOptions extends Omit<Taro.request.Option, 'success' | 'fail' | 'url'> {
  /** 是否禁用消息提示弹框 */
  disabledMessage?: boolean
  /** 请求时是否携带token */
  needToken?: boolean
}

/**
 * 网络请求
 * @param options
 * @returns
 */
export function request(url: string, options: RequestOptions) {
  const { data, disabledMessage = true, ...rest } = options

  const reqData = cloneDeep(data)

  // 展示错误信息
  const showErrorMessage = (config = '网络错误，请检查您的网络') => {
    if (!disabledMessage) return
    showToast(config)
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${process.env.TARO_APP_API}/api${url}`,
      data: reqData,
      method: 'POST',
      ...rest,
      success: (response) => {
        const res = response.data as API.BasicResponse<any>
        if (res.status !== 0) {
          showErrorMessage(res.msg)
          return reject(res)
        }
        resolve(res)
      },
      fail: (err) => {
        console.log('[ err ] >', err)
        reject(err)
      }
    })
  })
}

export default request
