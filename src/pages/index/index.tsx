import { Button } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <Button>按钮测试</Button>
    </View>
  )
}
