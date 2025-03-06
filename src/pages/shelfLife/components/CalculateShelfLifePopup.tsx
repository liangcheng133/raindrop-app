import { Field, Form, Popup, Radio } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import { forwardRef, useImperativeHandle } from 'react'
import './comm.less'

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
      <Popup.Backdrop onClick={close} />
      <ScrollView className='content'>
        <Form controlAlign='right' defaultValues={{ method: '1' }}>
          <Field label='计算方式' name='method' required rules={[{ required: true, message: '请选择计算方式' }]}>
            <Radio.Group direction='horizontal'>
              <Radio name='1'>按天</Radio>
              <Radio name='2'>按月</Radio>
              <Radio name='3'>按月</Radio>
            </Radio.Group>
          </Field>
        </Form>
      </ScrollView>
    </Popup>
  )
})

export default CalculateShelfLifePopup
