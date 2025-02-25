import { Popup } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import { forwardRef, useImperativeHandle } from 'react'
import '../index.less'

export interface CalculateShelfLifePopupProps {}

export interface CalculateShelfLifePopupRef {
  open: () => void
  close: () => void
}

/** 计算保质期弹框 */
const CalculateShelfLifePopup = forwardRef<CalculateShelfLifePopupRef, CalculateShelfLifePopupProps>((props, ref) => {
  const [visible, setVisible] = useSafeState(false)

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({ open, close }), [])

  return (
    <Popup className='calculate-shelf-life-popup' open={visible} lock rounded>
      <ScrollView>内容</ScrollView>
    </Popup>
  )
})

export default CalculateShelfLifePopup
