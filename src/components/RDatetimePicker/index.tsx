import { isEmpty } from '@/utils/validate'
import { DatetimePicker, Input, Popup } from '@taroify/core'
import { DatetimePickerProps } from '@taroify/core/datetime-picker/datetime-picker'
import { useSafeState } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import { forwardRef } from 'react'

export interface RDatetimePickerRef {}

export interface RDatetimePickerProps extends Omit<DatetimePickerProps, 'onChange' | 'value' | 'onConfirm'> {
  placeholder?: string
  disabled?: boolean
  value?: string | Date | Dayjs | undefined
  /** 选择器顶部标题 */
  title?: string
  /** 值格式化 */
  valueFormat?: string
  /** 值变化回调，用于Field时，可自动赋值表单项 */
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
}

const defaultValue = dayjs().toDate()

const formatObj = {
  date: 'YYYY-MM-DD'
}

/** 日期时间选择器 */
const RDatetimePicker = forwardRef<RDatetimePickerRef, RDatetimePickerProps>((props, ref) => {
  const { value, disabled, placeholder, title, onChange, onConfirm, valueFormat, type, ...rest } = props

  const valueFormatStr = valueFormat || formatObj[type!] || 'YYYY-MM-DD HH:mm:ss'

  const [visible, setVisible] = useSafeState(false)

  const formatValue = (val: string | Date | Dayjs | undefined) => {
    if (isEmpty(val)) return ''
    return dayjs(val).format(valueFormatStr)
  }

  const handleConfirm = (newValue: Date) => {
    const value = formatValue(newValue)
    onChange && onChange(value)
    onConfirm && onConfirm(value)
    setVisible(false)
  }

  return (
    <>
      <Input
        readonly
        placeholder={placeholder}
        onClick={() => setVisible(true)}
        value={formatValue(value)}
        disabled={disabled}
      />
      <Popup open={visible} rounded placement='bottom' onClose={setVisible}>
        <DatetimePicker
          type={type}
          defaultValue={defaultValue}
          onCancel={() => setVisible(false)}
          onConfirm={handleConfirm}
          {...rest}>
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button>取消</DatetimePicker.Button>
            <DatetimePicker.Title>{title || ''}</DatetimePicker.Title>
            <DatetimePicker.Button>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </Popup>
    </>
  )
})

export default RDatetimePicker
