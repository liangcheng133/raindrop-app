declare namespace API {
  /** 基础响应 */
  export type BasicResponse<T> = {
    status: number
    msg: string
    data: T
  }
  /** 成功响应信息 */
  export type SuccessResponse = BasicResponse<null>
  /** 错误响应信息 */
  export type ErrorResponse = BasicResponse<null> & {
    errMsg: string
  }
  export type BasicParams = {
    current?: number
    count?: number
  }
  /** 通用字段 */
  export type BasicField = {
    remark?: string
    create_user_id?: string
    create_user_name?: string
    update_user_id?: string
    update_user_name?: string
    create_time?: string
    update_time?: string
  }
  /** 保质期 */
  export type ShelfLife = BasicField & {
    id?: string
    name?: string
    typeId?: string
    produced_time?: string
    expiration_day?: number
    expiration_time?: string
  }
}
