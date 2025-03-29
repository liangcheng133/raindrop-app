import { RFlex } from '@/components'
import { cx } from '@/utils/classnamesBind'
import { Input } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import React from 'react'
import './login.less'
import AccountForm from './components/AccountForm'

/** 游客用户登录 */
const GuestUserLogin: React.FC<React.PropsWithChildren> = (props) => {
  const [tabSelectedKey, setTabSelectedKey] = useSafeState<String>('account')

  const isTabItemSelected = (key: String) => {
    return tabSelectedKey === key
  }

  const getTabItemClassName = (key: String) => {
    return cx('tabs-item', isTabItemSelected(key) && 'active')
  }

  const getFormDomStyle = (key: String) => {
    return {
      display: isTabItemSelected(key) ? 'block' : 'none'
    }
  }

  return (
    <View className='login-container'>
      <View className='float-container'>
        <View className='logo'></View>
        <View className='tabs-container'>
          <RFlex className='tabs'>
            <View className={getTabItemClassName('account')} onClick={() => setTabSelectedKey('account')}>
              账号登录
            </View>
            <View className={getTabItemClassName('email')} onClick={() => setTabSelectedKey('email')}>
              邮箱登录
            </View>
          </RFlex>
        </View>
        <AccountForm style={getFormDomStyle('account')} />
      </View>
    </View>
  )
}

export default GuestUserLogin
