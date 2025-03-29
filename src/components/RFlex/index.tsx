import { isNumber } from '@/utils/validate'
import { View } from '@tarojs/components'
import React from 'react'

interface RFlexProps extends React.PropsWithChildren {
  /** 子元素水平排列方式 */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  /** 子元素对齐方式 */
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  /** 子元素换行方式 */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  /** 子元素间距 */
  gap?: string | number
  /** 主轴的方向 */
  direction?: 'row' | 'column'
  className?: string
}

/** Flex容器 */
const RFlex: React.FC<RFlexProps> = (props) => {
  const { children, justify, align, wrap, gap, direction, ...rest } = props
  const domStyle = {
    display: 'flex',
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: isNumber(gap) ? `${gap}px` : gap,
    flexDirection: direction
  }

  return (
    <View className='r-flex' {...rest} style={domStyle}>
      {children}
    </View>
  )
}

export default RFlex
