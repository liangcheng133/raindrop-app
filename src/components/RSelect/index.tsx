import { cx } from '@/utils/classnamesBind'
import { isArray, isString } from '@/utils/validate'
import { Cell, Input, Navbar, Popup, SafeArea } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import { forwardRef, useEffect } from 'react'
import './index.less'

type ValueType = string | string[] | undefined

type OptionType = { label: string; value: string }

export interface RSelectRef {}

export interface RSelectProps {
  value?: ValueType
  placeholder?: string
  disabled?: boolean
  options?: OptionType[]
  /** 是否多选 */
  multi?: boolean
  /** 选择器顶部标题 */
  title?: string
  /** 值变化回调，用于Field时，可自动赋值表单项 */
  onChange?: (value: ValueType) => void
}

/** 单项/多项选择器 */
const RSelect = forwardRef<RSelectRef, RSelectProps>((props, ref) => {
  const { value, disabled, placeholder, title, onChange, options, multi, ...rest } = props

  const [visible, setVisible] = useSafeState(false)
  const [selectedValue, setSelectedValue] = useSafeState<string[]>([])

  const formatValue = (values: ValueType) => {
    if (isString(values)) {
      return options?.find((item) => item.value === values)?.label
    } else if (isArray(values)) {
      return (options?.filter((item) => values?.includes(item.value)).map((item) => item.label) ?? []).join(',')
    }
    return ''
  }

  const handleSelect = (item: OptionType) => {
    if (multi) {
      if (selectedValue.includes(item.value)) {
        setSelectedValue(selectedValue.filter((v) => v !== item.value))
      } else {
        setSelectedValue([...selectedValue, item.value])
      }
    } else {
      setSelectedValue([item.value])
    }
  }

  const handleConfirm = () => {
    if (multi) {
      onChange && onChange(selectedValue)
    } else {
      onChange && onChange(selectedValue[0])
    }
    setVisible(false)
  }

  const updateValue = () => {
    if (multi) {
      if (Array.isArray(value)) {
        setSelectedValue(value)
        return
      }
    } else {
      if (isString(value)) {
        setSelectedValue([value])
        return
      }
    }
    setSelectedValue([])
  }

  useEffect(() => {
    updateValue()
  }, [value])

  useEffect(() => {
    if (!multi && selectedValue.length > 0) {
      handleConfirm()
    }
  }, [selectedValue, multi])

  return (
    <>
      <Input
        readonly
        placeholder={placeholder}
        onClick={() => setVisible(true)}
        value={formatValue(value)}
        disabled={disabled}
      />
      <Popup className='r-select-popup' open={visible} rounded placement='bottom' onClose={setVisible}>
        <Navbar className='r-select-navbar'>
          {multi && <Navbar.NavLeft icon={false}>取消</Navbar.NavLeft>}
          <Navbar.Title>{title}</Navbar.Title>
          {multi && <Navbar.NavRight onClick={handleConfirm}>确认</Navbar.NavRight>}
        </Navbar>
        <ScrollView className='r-select-content' scrollY>
          <Cell.Group>
            {options?.map((item) => {
              return (
                <Cell
                  className={cx({ active: selectedValue.includes(item.value) })}
                  key={item.value}
                  onClick={() => handleSelect(item)}>
                  {item.label}
                </Cell>
              )
            })}
          </Cell.Group>
        </ScrollView>
        <SafeArea position='bottom' />
      </Popup>
    </>
  )
})

export default RSelect
