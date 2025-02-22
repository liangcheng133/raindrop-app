import { Layout } from '@/components'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import './index.less'

const ShelfLifeIndex: React.FC<React.PropsWithChildren> = (props) => {
  const onTest = () => {
    Taro.navigateTo({ url: '/pages/index/index' })
  }
  return (
    <Layout>
      <Form controlAlign='right'>
        <Toast id='toast' />
        <Form.Item name='id' noStyle />
        <View className='header-title'>基础信息</View>
        <Cell.Group inset>
          <Form.Item name='name' required rules={[{ required: true, message: '请填写物品名称' }]}>
            <Form.Label>物品名称</Form.Label>
            <Form.Control>
              <Input placeholder='物品名称' />
            </Form.Control>
          </Form.Item>
        </Cell.Group>

        <View className='header-title'>保质期</View>
        <Cell.Group inset>
          <Form.Item name='produced_time'>
            <Form.Label>生产日期</Form.Label>
            <Form.Control>
              <Input placeholder='生产日期' />
            </Form.Control>
          </Form.Item>
          <Form.Item name='expiration_time' required rules={[{ required: true, message: '请填写过期时间' }]}>
            <Form.Label>过期时间</Form.Label>
            <Form.Control>
              <Input placeholder='过期时间' />
            </Form.Control>
          </Form.Item>
          <Cell title={<View></View>}>
            <Button variant='text' color='primary' size='small'>
              计算保质期
            </Button>
          </Cell>
        </Cell.Group>
      </Form>
    </Layout>
  )
}

export default ShelfLifeIndex
