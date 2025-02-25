import { Layout } from '@/components'
import { Button, Cell, Field, Form, Input } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import CalculateShelfLifePopup, { CalculateShelfLifePopupRef } from './components/CalculateShelfLifePopup'
import './index.less'

const ShelfLifeIndex: React.FC<React.PropsWithChildren> = (props) => {
  const calculateShelfLifePopupRef = React.createRef<CalculateShelfLifePopupRef>()

  // 打开计算保质期弹窗
  const openCalculateShelfLifePopup = () => {
    calculateShelfLifePopupRef.current?.open()
  }

  return (
    <Layout>
      <Form controlAlign='right'>
        <Form.Item name='id' noStyle></Form.Item>
        <View className='header-title'>基础信息</View>
        <Cell.Group inset>
          <Field label='物品名称' name='name' required rules={[{ required: true, message: '请填写物品名称' }]}>
            <Input placeholder='物品名称' />
          </Field>
        </Cell.Group>

        <View className='header-title'>保质期</View>
        <Cell.Group inset>
          <Field label='生产日期' name='produced_time'>
            <Input placeholder='生产日期' />
          </Field>
          <Field
            label='过期时间'
            name='expiration_time'
            required
            isLink
            clickable
            rules={[{ required: true, message: '请填写过期时间' }]}>
            <Input placeholder='过期时间' readonly onClick={openCalculateShelfLifePopup} />
          </Field>
        </Cell.Group>
      </Form>

      <CalculateShelfLifePopup ref={calculateShelfLifePopupRef} />
    </Layout>
  )
}

export default ShelfLifeIndex
