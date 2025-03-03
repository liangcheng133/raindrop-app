import { Layout, RDatetimePicker } from '@/components'
import RSelect from '@/components/RSelect'
import { cloneDeep } from '@/utils'
import { Cell, Field, Form, Input } from '@taroify/core'
import { View } from '@tarojs/components'
import React, { useRef, useState } from 'react'
import './index.less'

const defaultForm = {}

const dayOptions = [
  { label: '90天', value: 90 },
  { label: '180天', value: 180 },
  { label: '365天', value: 365 }
]

/** 保质期管理 */
const ShelfLifeIndex: React.FC<React.PropsWithChildren> = (props) => {
  const [formData, setFormData] = useState(cloneDeep(defaultForm))
  const formRef = useRef()

  const onFieldChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

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
              <RDatetimePicker {...controller} title='生产日期' placeholder='请选择生产日期' type='date' />
            )}
          </Field>
          <Field
            label='过期天数'
            name='expiration_day'
            required
            isLink
            clickable
            rules={[{ required: true, message: '请填写过期天数' }]}>
            {(controller) => (
              <RSelect {...controller} title='过期天数' placeholder='请选择过期天数' options={dayOptions} />
            )}
          </Field>
          <Field
            label='过期日期'
            name='expiration_time'
            required
            isLink
            clickable
            rules={[{ required: true, message: '请填写过期日期' }]}>
            {(controller) => (
              <RDatetimePicker {...controller} title='过期日期' placeholder='请选择过期日期' type='date' />
            )}
          </Field>
        </Cell.Group>
      </Form>
    </Layout>
  )
}

export default ShelfLifeIndex
