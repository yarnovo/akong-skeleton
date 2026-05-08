# @akong/skeleton

> ← 回 [akong design system](https://yarnovo.github.io/akong-core/) 总站

akong Skeleton · 加载占位 · pulse / shimmer 动画 · 任意尺寸 · 跨端 (Web + React Native)

## Demo

[GitHub Pages 演示](https://yarnovo.github.io/akong-skeleton/)

## 安装

```bash
npm i github:yarnovo/akong-skeleton github:yarnovo/akong-tokens
```

## Web

```tsx
import { Skeleton } from '@akong/skeleton'
import '@akong/skeleton/style.css'
import '@akong/tokens/style.css'  // 顶层引一次 token (整个 app 共用)

// 单行文字占位
<Skeleton height={16} />

// shimmer 大块卡片
<Skeleton width="100%" height={200} variant="shimmer" radius="lg" />

// 圆形头像
<Skeleton width={48} height={48} radius="full" />

// 自定义 className / style
<Skeleton height={14} width="60%" className="my-mb" style={{ marginBottom: 8 }} />
```

## React Native

```tsx
import { Skeleton } from '@akong/skeleton'

<Skeleton width={200} height={16} variant="pulse" radius="md" />
<Skeleton width={48}  height={48} radius="full" />
```

Metro bundler 自动按 `.native.tsx` 后缀解析 · 同 `import` 路径两端通用。

## API

| Prop | Type | Default | 说明 |
|---|---|---|---|
| width | `number \| string` | `'100%'` | 数字按 px · 字符串原样 (`'50%'` / `'12rem'`) |
| height | `number \| string` | **必填** | 没默认 · skeleton 永远要明确占位高度 |
| variant | `'pulse' \| 'shimmer'` | `'pulse'` | pulse: opacity 闪 · shimmer: 渐变扫光 |
| radius | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | 跟 token `--ak-radius-*` |
| className | `string` | — | Web 专用 · 拼自定义 class |
| style | `CSSProperties` | — | Web 专用 · 内联 style 合并 (优先级高于内置 width/height) |
| nativeStyle | `StyleProp<ViewStyle>` | — | RN 专用 · 自定义 style |
| ariaLabel | `string` | `'Loading'` | a11y · 屏幕阅读器朗读 |

## 视觉

- 底色: `var(--ak-bg-subtle)` (Web) / `tokens.<scheme>.bgSubtle` (RN)
- pulse: opacity 0.5 ↔ 1 · 1.4s ease-in-out infinite
- shimmer: linear-gradient(bg-subtle → bg-hover → bg-subtle) · 1.4s linear infinite
- 自动响应 `prefers-reduced-motion` (Web 直接 `animation: none`)

## 设计原则

- **一份 props**：Web 跟 RN 共享 `Skeleton.types.ts`
- **两端实现**：`Skeleton.tsx` (Web · `<div>` + CSS animation) + `Skeleton.native.tsx` (RN · `Animated.View` 循环)
- **a11y**：`role="status"` + `aria-busy="true"` + `aria-label="Loading"` (可改)
- **不传交互**：skeleton 是占位 · `pointer-events: none` (Web) · 无 onPress (RN)
- **token 100% 接 @akong/tokens**：改一处 token 自动 update
