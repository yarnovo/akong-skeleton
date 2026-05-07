/**
 * Web 端组件测试 · vitest + @testing-library/react
 *
 * 覆盖:
 * - 默认 props 渲染 (width 100% / pulse / radius md / a11y)
 * - variant class (pulse vs shimmer)
 * - width/height 反映在 inline style (number → px · string 原样)
 * - radius class (sm/md/lg/full)
 * - className/style 透传 + 不被覆盖
 * - 行为契约 (共享 spec ≥ 7 cases)
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '../src/Skeleton'
import { skeletonScenarios } from '../src/Skeleton.behavior'

const getEl = (container: HTMLElement) => container.querySelector('.ak-skeleton') as HTMLDivElement

describe('Skeleton (Web) · 渲染', () => {
  it('默认 props · 渲染带 height 的占位 · width 100% · pulse · radius md', () => {
    const { container } = render(<Skeleton height={16} />)
    const el = getEl(container)
    expect(el).toBeTruthy()
    expect(el.style.width).toBe('100%')
    expect(el.style.height).toBe('16px')
    expect(el.classList.contains('ak-skeleton--pulse')).toBe(true)
    expect(el.classList.contains('ak-skeleton--radius-md')).toBe(true)
  })

  it('a11y · role=status · aria-busy=true · 默认 ariaLabel=Loading', () => {
    render(<Skeleton height={16} />)
    const el = screen.getByRole('status')
    expect(el).toHaveAttribute('aria-busy', 'true')
    expect(el).toHaveAttribute('aria-label', 'Loading')
  })

  it('自定义 ariaLabel 透传', () => {
    render(<Skeleton height={16} ariaLabel="正在加载用户资料" />)
    expect(screen.getByLabelText('正在加载用户资料')).toBeInTheDocument()
  })
})

describe('Skeleton (Web) · variant', () => {
  it('variant=pulse · class ak-skeleton--pulse', () => {
    const { container } = render(<Skeleton height={16} variant="pulse" />)
    expect(getEl(container).classList.contains('ak-skeleton--pulse')).toBe(true)
    expect(getEl(container).classList.contains('ak-skeleton--shimmer')).toBe(false)
  })

  it('variant=shimmer · class ak-skeleton--shimmer', () => {
    const { container } = render(<Skeleton height={16} variant="shimmer" />)
    expect(getEl(container).classList.contains('ak-skeleton--shimmer')).toBe(true)
    expect(getEl(container).classList.contains('ak-skeleton--pulse')).toBe(false)
  })
})

describe('Skeleton (Web) · width / height', () => {
  it('数字 width / height → px', () => {
    const { container } = render(<Skeleton width={200} height={40} />)
    expect(getEl(container).style.width).toBe('200px')
    expect(getEl(container).style.height).toBe('40px')
  })

  it('字符串 width 原样 (50%)', () => {
    const { container } = render(<Skeleton width="50%" height={12} />)
    expect(getEl(container).style.width).toBe('50%')
  })

  it('字符串 height 原样 (1.5rem)', () => {
    const { container } = render(<Skeleton height="1.5rem" />)
    expect(getEl(container).style.height).toBe('1.5rem')
  })
})

describe('Skeleton (Web) · radius', () => {
  it.each<['sm' | 'md' | 'lg' | 'full']>([['sm'], ['md'], ['lg'], ['full']])(
    'radius=%s · class ak-skeleton--radius-%s',
    (r) => {
      const { container } = render(<Skeleton height={16} radius={r} />)
      expect(getEl(container).classList.contains(`ak-skeleton--radius-${r}`)).toBe(true)
    },
  )
})

describe('Skeleton (Web) · 透传', () => {
  it('className 透传 · 跟内置 class 共存', () => {
    const { container } = render(<Skeleton height={16} className="my-extra" />)
    const el = getEl(container)
    expect(el.classList.contains('my-extra')).toBe(true)
    expect(el.classList.contains('ak-skeleton')).toBe(true)
  })

  it('style 透传 · 不被 width/height 覆盖 (用户 style 优先)', () => {
    const { container } = render(<Skeleton height={16} style={{ marginTop: 8, width: '300px' }} />)
    const el = getEl(container)
    expect(el.style.marginTop).toBe('8px')
    // user style.width 比内置 width prop 优先
    expect(el.style.width).toBe('300px')
  })
})

describe('Skeleton (Web) · 行为契约 (共享 spec)', () => {
  for (const sc of skeletonScenarios) {
    it(sc.name, () => {
      const { container } = render(<Skeleton {...sc.props} />)
      const el = getEl(container)
      expect(el.style.width).toBe(sc.expectWidth)
      expect(el.style.height).toBe(sc.expectHeight)
      expect(el.classList.contains(`ak-skeleton--${sc.expectVariant}`)).toBe(true)
      expect(el.classList.contains(`ak-skeleton--radius-${sc.expectRadius}`)).toBe(true)
    })
  }
})
