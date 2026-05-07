import type { CSSProperties } from 'react'
import type { SkeletonProps } from './Skeleton.types'
import './Skeleton.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** 数字 → '<n>px' · 字符串原样返 (支持 '50%' / '12rem' / 'auto') */
function toCssLength(v: number | string): string {
  return typeof v === 'number' ? `${v}px` : v
}

/** akong Skeleton · Web · `<div>` + CSS animation */
export function Skeleton(props: SkeletonProps) {
  const {
    width = '100%',
    height,
    variant = 'pulse',
    radius = 'md',
    className,
    style,
    ariaLabel = 'Loading',
  } = props

  const merged: CSSProperties = {
    width: toCssLength(width),
    height: toCssLength(height),
    ...style,
  }

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
      className={cls(
        'ak-skeleton',
        `ak-skeleton--${variant}`,
        `ak-skeleton--radius-${radius}`,
        className,
      )}
      style={merged}
    />
  )
}

export default Skeleton
