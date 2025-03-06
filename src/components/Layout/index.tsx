import { HOME_PAGE_ROUTE } from '@/constants'
import { ConfigProvider, Navbar, SafeArea } from '@taroify/core'
import { Icon } from '@taroify/icons'
import { View } from '@tarojs/components'
import Taro, { getCurrentPages } from '@tarojs/taro'
import React from 'react'
import './index.less'

interface PageInstance {
  route?: string
  config?: {
    navigationBarTitleText?: string
    navigationStyle?: string
  }
}

interface LayoutProps {
  children: React.ReactNode
}

interface LayoutRef {
  /** 返回首页 */
  goHome: () => void
  /** 返回上一页 */
  goBack: () => void
}

// 返回首页图标
const HomeIcon = <Icon classPrefix='rd icon-home' />
// 返回上一页图标
const BackIcon = <Icon classPrefix='rd icon-left' />

/** 基础布局组件 */
const Layout = React.forwardRef<LayoutRef, LayoutProps>((props, ref) => {
  const pages = getCurrentPages()
  const currentPage = pages[0] as PageInstance
  // console.log('[ currentPage ] >', currentPage)

  const isCanGoHome = pages.length === 1 && currentPage?.route !== HOME_PAGE_ROUTE

  const goHome = () => {
    if (isCanGoHome) return
    Taro.reLaunch({
      url: HOME_PAGE_ROUTE
    })
  }

  const goBack = () => {
    if (pages.length === 1) return
    Taro.navigateBack()
  }

  // 导航栏点击回调
  const onNavbarClick = () => {
    if (pages.length > 1) {
      goBack()
    } else {
      goHome()
    }
  }

  React.useImperativeHandle(ref, () => ({ goHome, goBack }), [])

  return (
    <ConfigProvider>
      <View className='app-layout'>
        {currentPage?.config?.navigationStyle === 'custom' && (
          <>
            <SafeArea position='top' nativeSafeTop />
            <Navbar>
              {pages.length !== 1 && (
                <Navbar.NavLeft icon={isCanGoHome ? HomeIcon : BackIcon} onClick={onNavbarClick}></Navbar.NavLeft>
              )}
              <Navbar.Title>{currentPage?.config?.navigationBarTitleText || ''}</Navbar.Title>
            </Navbar>
          </>
        )}
        <View className='app-layout-container'>{props.children}</View>
      </View>
    </ConfigProvider>
  )
})

export default Layout
