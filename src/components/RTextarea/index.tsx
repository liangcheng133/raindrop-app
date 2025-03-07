import { cx } from '@/utils/classnamesBind'
import { Textarea } from '@taroify/core'
import { TextareaProps } from '@taroify/core/textarea/textarea'
import { View } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import { forwardRef, useEffect } from 'react'
import './index.less'

export interface RTextareaProps extends TextareaProps {}

export interface RTextareaRef {}

/**
 * 多行输入框
 * * 修复 微信小程序 placeholder不支持line-height的问题
 */
const RTextarea = forwardRef<RTextareaRef, RTextareaProps>((props, ref) => {
  const { onChange, value: propsValue, placeholder, ...rest } = props
  const [value, setValue] = useSafeState<String>('')

  const handleChange = (e) => {
    setValue(e.detail.value)
    onChange?.(e.detail.value)
  }

  useEffect(() => {
    setValue(propsValue || '')
  }, [propsValue, setValue])

  return (
    <View className={cx('textarea-content')}>
      <View className={cx('textarea-placeholder', { hide: value.length > 0 })}>{placeholder}</View>
      <Textarea {...rest} onChange={handleChange} />
    </View>
  )
})

export default RTextarea
