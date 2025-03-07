import { Layout } from '@/components'
import { appendQueryParams } from '@/utils'
import { FloatingBubble, PullRefresh } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import { useSafeState } from 'ahooks'
import React from 'react'
import './manage.less'

/** 保质期管理 */
const ShelfLifeManage: React.FC<React.PropsWithChildren> = (props) => {
  const [loading, setLoading] = useSafeState(false)
  const [counter, setCounter] = useSafeState(0)
  const [reachTop, setReachTop] = useSafeState(true)

  const toShelfLifeIndex = () => {
    Taro.navigateTo({
      url: appendQueryParams('/pages/shelfLife/index')
    })
  }

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <Layout>
      <PullRefresh
        className='pull-refresh-container'
        loading={loading}
        reachTop={reachTop}
        onRefresh={() => {
          setLoading(true)
          setTimeout(() => {
            setCounter(counter + 1)
            setLoading(false)
          }, 1000)
        }}
      >
        <View className='pull-text'>{counter ? '刷新次数：' + counter : '下拉试试'}</View>
      </PullRefresh>
      <FloatingBubble
        axis='xy'
        magnetic='x'
        icon={<View className='rd icon-plus float-icon'></View>}
        onClick={toShelfLifeIndex}
      />
    </Layout>
  )
}

export default ShelfLifeManage
