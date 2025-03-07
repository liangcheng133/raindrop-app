import { Layout, RDatetimePicker, RTextarea } from '@/components'
import RSelect from '@/components/RSelect'
import { showToast } from '@/utils'
import { cx } from '@/utils/classnamesBind'
import { Button, Cell, Field, FixedView, Flex, Form, Input } from '@taroify/core'
import { FormController, FormInstance } from '@taroify/core/form'
import { View } from '@tarojs/components'
import React, { useRef } from 'react'
import './index.less'

const defaultForm = {}

const dayOptions = [
  { label: '90天', value: '90' },
  { label: '180天', value: '180' },
  { label: '365天', value: '365' }
]

const typeOptions = [
  { label: '食品', value: 'sp' },
  { label: '医疗', value: 'yl' },
  { label: '宠物', value: 'cw' }
]

/** 保质期新增/编辑 */
const ShelfLifeIndex: React.FC<React.PropsWithChildren> = (props) => {
  const formRef = useRef<FormInstance>()

  const onFieldChange = (name: string, value: any, controller?: FormController<any>) => {
    controller?.onChange?.(value)
  }

  const onResetForm = () => {
    formRef?.current?.reset()
  }

  const handleSubmit = (event) => {
    try {
      const formValues: API.ShelfLife = event.detail.value
      console.log('[ formValues ] >', formValues)
    } catch (error) {
      console.log(error)
      showToast('哎呀，好像出现了什么脏东西，刷新页面重试')
    }
  }

  return (
    <Layout>
      <Form ref={formRef} defaultValues={defaultForm} labelAlign='right' onSubmit={handleSubmit}>
        <Form.Item name='id' noStyle></Form.Item>
        <View className='header-title'>基础信息</View>
        <Cell.Group inset>
          <Field label='物品名称' name='name' required rules={[{ required: true, message: '请填写物品名称' }]}>
            <Input placeholder='物品名称' />
          </Field>
          <Field label='分类' name='typeId' isLink clickable>
            {(controller) => <RSelect {...controller} title='分类' placeholder='请选择分类' options={typeOptions} />}
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
            rules={[{ required: true, message: '请填写过期天数' }]}
          >
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
            rules={[{ required: true, message: '请填写过期日期' }]}
          >
            {(controller) => (
              <RDatetimePicker {...controller} title='过期日期' placeholder='请选择过期日期' type='date' />
            )}
          </Field>
        </Cell.Group>

        <View className='header-title'>其它信息</View>
        <Cell.Group inset>
          <Field label='备注' name='remark'>
            {(controller) => <RTextarea {...controller} placeholder='请输入留言' autoHeight />}
          </Field>
        </Cell.Group>

        <FixedView className={cx('fixed-view')} position='bottom' safeArea='bottom' placeholder>
          <Flex className={cx('fixed-view-options')} justify='center' gutter={12}>
            <Flex.Item span={6}>
              <Button color='danger' block onClick={onResetForm}>
                重置
              </Button>
            </Flex.Item>
            <Flex.Item span={18}>
              <Button color='primary' block formType='submit'>
                保存
              </Button>
            </Flex.Item>
          </Flex>
        </FixedView>
      </Form>
    </Layout>
  )
}

export default ShelfLifeIndex
