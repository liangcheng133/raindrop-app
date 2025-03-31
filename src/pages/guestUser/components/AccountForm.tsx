import { RFlex } from '@/components'
import { GuestUser } from '@/services'
import { Button, Input, Radio } from '@taroify/core'
import { View } from '@tarojs/components'
import { useSetState } from 'ahooks'
import React from 'react'
import '../login.less'

interface AccountFormProps {
  style?: React.CSSProperties
}

interface FormState {
  account?: string
  password?: string
}

/** 账号登录表单 */
const AccountForm: React.FC<AccountFormProps> = ({ ...rest }) => {
  const [form, setForm] = useSetState<FormState>({})

  const onSubmit = () => {
    GuestUser.login(form).then((res) => {
      console.log('[ 会员 ] >', res)
    })
    console.log(form)
  }

  return (
    <View className='form-container' {...rest}>
      <View className='form-item'>
        <View className='form-label'>账号/手机号</View>
        <RFlex className='form-input'>
          <View className='rd icon-user'></View>
          <Input
            className='input'
            placeholder='请输入账号/手机号'
            value={form.account}
            onInput={(e) => setForm({ account: e.detail.value })}
          />
        </RFlex>
      </View>
      <View className='form-item'>
        <View className='form-label'>密码</View>
        <RFlex className='form-input'>
          <View className='rd icon-lock'></View>
          <Input
            className='input'
            password
            placeholder='请输入密码'
            value={form.password}
            onInput={(e) => setForm({ password: e.detail.value })}
          />
        </RFlex>
      </View>
      <Radio className='remember' shape='square'>记住我</Radio>
      <Button block color='primary' size='large' onClick={onSubmit}>
        登录
      </Button>
    </View>
  )
}

export default AccountForm
