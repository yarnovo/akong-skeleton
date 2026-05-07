import type { CSSProperties } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'

export type SkeletonVariant = 'pulse' | 'shimmer'
export type SkeletonRadius = 'sm' | 'md' | 'lg' | 'full'

export interface SkeletonProps {
  /** 宽度 · 数字按 px · 字符串原样 (例 '50%' / '12rem') · 默认 '100%' */
  width?: number | string
  /** 高度 · 必填 · 没默认 (skeleton 永远要明确占位高度) */
  height: number | string
  /** 动画 · 默认 'pulse' */
  variant?: SkeletonVariant
  /** 圆角 · 默认 'md' */
  radius?: SkeletonRadius
  /** Web 专用 · 拼自定义 className */
  className?: string
  /** Web 专用 · 内联 style 合并 (优先级高于内置 width/height) */
  style?: CSSProperties
  /** RN 专用 · 自定义 style (合并到 Animated.View) */
  nativeStyle?: StyleProp<ViewStyle>
  /** a11y · 屏幕阅读器朗读 · 默认 'Loading' */
  ariaLabel?: string
}
