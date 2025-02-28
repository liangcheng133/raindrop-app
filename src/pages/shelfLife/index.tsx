import { FieldDatetimePicker, Layout } from '@/components'
import { Cell, Field, Form, Input, Radio } from '@taroify/core'
import { View } from '@tarojs/components'
import { cloneDeep } from 'es-toolkit'
import React, { useEffect, useRef, useState } from 'react'
import './index.less'

const defaultForm = {
  method: '1'
}

/** 保质期管理 */
const ShelfLifeIndex: React.FC<React.PropsWithChildren> = (props) => {
  const [formData, setFormData] = useState(cloneDeep(defaultForm))
  const formRef = useRef()
  useEffect(() => {
    console.log(formRef.current)
  }, [formRef])

  return (
    <Layout>
      <Form ref={formRef} defaultValues={defaultForm} labelAlign='right'>
        <Form.Item name='id' noStyle></Form.Item>
        <View className='header-title'>基础信息</View>
        <Cell.Group inset>
          <Field label='物品名称' name='name' required rules={[{ required: true, message: '请填写物品名称' }]}>
            <Input placeholder='物品名称' />
          </Field>
        </Cell.Group>

        <View className='header-title'>保质期</View>
        <Cell.Group inset>
          <Field label='生产日期' name='produced_time' isLink>
            {(controller) => (
              <FieldDatetimePicker {...controller} title='生产日期' placeholder='请选择生产日期' type='date' />
            )}
          </Field>
          <Field label='计算方式' name='method' required rules={[{ required: true, message: '请选择计算方式' }]}>
            <Radio.Group direction='horizontal'>
              <Radio name='1'>按天</Radio>
              <Radio name='2'>按月</Radio>
              <Radio name='3'>自选</Radio>
            </Radio.Group>
          </Field>
          <Field
            label='过期日期'
            name='expiration_time'
            required
            isLink
            clickable
            rules={[{ required: true, message: '请填写过期日期' }]}>
            {(controller) => (
              <FieldDatetimePicker {...controller} title='过期日期' placeholder='请选择过期日期' type='date' />
            )}
          </Field>
        </Cell.Group>
      </Form>
    </Layout>
  )
}

export default ShelfLifeIndex
