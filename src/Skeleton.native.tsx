/**
 * akong Skeleton · React Native 实现
 *
 * Metro bundler 默认按 `.native.tsx` 后缀解析 RN 端 · `.tsx` 解析 Web 端
 * 用方 `import { Skeleton } from '@aily-ui/skeleton'` 自动取对应平台
 */

import { useEffect, useRef } from 'react'
import { Animated, Easing, View, useColorScheme, type DimensionValue } from 'react-native'
import { tokens } from '@aily-ui/tokens'
import type { SkeletonProps, SkeletonRadius } from './Skeleton.types'

const radiusMap: Record<SkeletonRadius, number> = {
  sm: tokens.radius.sm,
  md: tokens.radius.md,
  lg: tokens.radius.lg,
  full: tokens.radius.full,
}

/** number → px (RN 数字 = px) · string → 原样 ('50%' 等百分比) */
function toRnLength(v: number | string): DimensionValue {
  return v as DimensionValue
}

export function Skeleton(props: SkeletonProps) {
  const {
    width = '100%',
    height,
    variant = 'pulse',
    radius = 'md',
    nativeStyle,
    ariaLabel = 'Loading',
  } = props

  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark'
  const t = scheme === 'dark' ? tokens.dark : tokens.light

  // 共用 0 → 1 → 0 循环动画 · 1.4s
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 700,
          easing: variant === 'pulse' ? Easing.inOut(Easing.ease) : Easing.linear,
          useNativeDriver: variant === 'pulse', // pulse 改 opacity 可上 native driver · shimmer 改 layout 不可
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 700,
          easing: variant === 'pulse' ? Easing.inOut(Easing.ease) : Easing.linear,
          useNativeDriver: variant === 'pulse',
        }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [progress, variant])

  const baseStyle = {
    width: toRnLength(width),
    height: toRnLength(height),
    backgroundColor: t.bgSubtle,
    borderRadius: radiusMap[radius],
    overflow: 'hidden' as const,
  }

  if (variant === 'pulse') {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5],
    })
    return (
      <Animated.View
        accessible
        accessibilityLabel={ariaLabel}
        accessibilityRole="progressbar"
        accessibilityState={{ busy: true }}
        style={[baseStyle, { opacity }, nativeStyle]}
      />
    )
  }

  // shimmer · 在底色之上扫一条高亮带 · translateX -100% → 100%
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '100%'],
  })

  return (
    <View
      accessible
      accessibilityLabel={ariaLabel}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      style={[baseStyle, nativeStyle]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: t.bgHover,
          opacity: 0.6,
          transform: [{ translateX }],
        }}
      />
    </View>
  )
}

export default Skeleton
