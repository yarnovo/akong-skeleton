import type { SkeletonProps } from './Skeleton.types'
import './Skeleton.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** akong Skeleton · Web · DOM `<button>` */
export function Skeleton(props: SkeletonProps) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    children,
    onClick,
    onPress,
    type = 'button',
    ariaLabel,
  } = props

  const handle = () => {
    if (disabled || loading) return
    onClick?.()
    onPress?.()
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handle}
      className={cls(
        'ak-skeleton',
        `ak-skeleton--${variant}`,
        `ak-skeleton--${size}`,
        fullWidth && 'ak-skeleton--full-width',
        loading && 'ak-skeleton--loading',
      )}
    >
      {iconLeft && <span className="ak-skeleton__icon">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="ak-skeleton__icon">{iconRight}</span>}
    </button>
  )
}

export default Skeleton
