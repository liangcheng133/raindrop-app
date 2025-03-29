import request from '@/utils/request'

/** 会员 */
export default class GuestUser {
  /** 账号登录 */
  static accountLogin(data: any) {
    return request('/family/guestUser/accountLogin', {
      data
    })
  }
}
