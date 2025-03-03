import { Cell, Input, Navbar, Popup, SafeArea } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useSafeState } from 'ahooks'
import { forwardRef, useEffect } from 'react'
import './index.less'

export interface RSelectRef {}

type ValueType = string | string[] | number | number[] | undefined

type OptionType = { label: string; value: string | number }

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
  onConfirm?: (value: ValueType) => void
}

/** 单项/多项选择器 */
const RSelect = forwardRef<RSelectRef, RSelectProps>((props, ref) => {
  const { value, disabled, placeholder, title, onChange, onConfirm, options, multi, ...rest } = props

  const [visible, setVisible] = useSafeState(false)
  const [selectedValue, setSelectedValue] = useSafeState<string[] | number[]>([])

  const updateValue = () => {
    if (multi) {
      if (Array.isArray(value)) {
        setSelectedValue(value)
        return
      }
    } else {
      // typeof value === 'string' | typeof value === 'number'  这样子写eslint会报错，不明原因
      if (typeof value === 'string') {
        setSelectedValue([value])
        return
      } else if (typeof value === 'number') {
        setSelectedValue([value])
        return
      }
    }
    setSelectedValue([])
  }

  const formatValue = (option: ValueType) => {
    return ''
  }

  const handleSelect = (item: OptionType) => {}

  const handleConfirm = (newValue) => {
    // const value = formatValue(newValue)
    // onChange && onChange(value)
    // onConfirm && onConfirm(value)
    // setVisible(false)
  }

  useEffect(() => {
    updateValue()
  }, [value])

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
          <Navbar.NavLeft icon={false}>取消</Navbar.NavLeft>
          <Navbar.Title>{title}</Navbar.Title>
          <Navbar.NavRight>确认</Navbar.NavRight>
        </Navbar>
        <ScrollView className='r-select-content' scrollY>
          <Cell.Group>
            {options?.map((item) => {
              return (
                <Cell key={item.value} onClick={() => handleSelect(item)}>
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
