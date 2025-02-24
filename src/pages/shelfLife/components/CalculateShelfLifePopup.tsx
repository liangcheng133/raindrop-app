import { Popup } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import React from 'react'

/** 计算保质期弹框 */
const CalculateShelfLifePopup: React.FC<React.PropsWithChildren> = (props) => {
  const [visible, setVisible] = useSafeState(false)

  return (
    <Popup open={visible} lock rounded>
      <ScrollView>内容</ScrollView>
    </Popup>
  )
}

export default CalculateShelfLifePopup
