declare namespace API {
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
