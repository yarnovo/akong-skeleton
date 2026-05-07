/**
 * 跨端行为契约 · Web + RN 都遵循
 *
 * Skeleton 不是交互组件 · 行为契约 = 给定 props · 视觉/语义状态该呈现啥
 * Web 校 className + style · RN 校 style 数组里的对应字段
 */

import type { SkeletonVariant, SkeletonRadius } from './Skeleton.types'

export interface RenderScenario {
  name: string
  props: {
    width?: number | string
    height: number | string
    variant?: SkeletonVariant
    radius?: SkeletonRadius
  }
  /** 期望 width 解析后字符串 (Web '100%' / '120px'; RN 直接 100% 或 120) */
  expectWidth: string | number
  /** 期望 height 解析后字符串 */
  expectHeight: string | number
  /** 期望 variant (用于 class / 动画分支) */
  expectVariant: SkeletonVariant
  /** 期望 radius (用于 class / borderRadius) */
  expectRadius: SkeletonRadius
}

/** 共享场景 · Web + RN 都跑 (≥ 6 cases) */
export const skeletonScenarios: RenderScenario[] = [
  {
    name: 'default · width 100% · pulse · radius md',
    props: { height: 16 },
    expectWidth: '100%',
    expectHeight: '16px',
    expectVariant: 'pulse',
    expectRadius: 'md',
  },
  {
    name: 'shimmer variant',
    props: { height: 20, variant: 'shimmer' },
    expectWidth: '100%',
    expectHeight: '20px',
    expectVariant: 'shimmer',
    expectRadius: 'md',
  },
  {
    name: '数字 width / height 转 px',
    props: { width: 200, height: 40 },
    expectWidth: '200px',
    expectHeight: '40px',
    expectVariant: 'pulse',
    expectRadius: 'md',
  },
  {
    name: '字符串 width 原样保留 (50%)',
    props: { width: '50%', height: 12 },
    expectWidth: '50%',
    expectHeight: '12px',
    expectVariant: 'pulse',
    expectRadius: 'md',
  },
  {
    name: 'radius full (圆形 avatar 用)',
    props: { width: 40, height: 40, radius: 'full' },
    expectWidth: '40px',
    expectHeight: '40px',
    expectVariant: 'pulse',
    expectRadius: 'full',
  },
  {
    name: 'radius sm + shimmer · card 用',
    props: { width: 320, height: 120, variant: 'shimmer', radius: 'sm' },
    expectWidth: '320px',
    expectHeight: '120px',
    expectVariant: 'shimmer',
    expectRadius: 'sm',
  },
  {
    name: 'radius lg · paragraph 行用',
    props: { width: '80%', height: 14, radius: 'lg' },
    expectWidth: '80%',
    expectHeight: '14px',
    expectVariant: 'pulse',
    expectRadius: 'lg',
  },
]
