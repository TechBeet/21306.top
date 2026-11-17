# 船队三维页面全面质检与问题修复 Spec

## Why
用户要求全面了解 `d:/github/21306.top/ship/index.html` 并进行问题排查与质检。该单文件应用（7049 行）承载 Three.js 五船渲染、浮力物理、程序化音频与多端 UI，已通过静态检查与浏览器运行时检查发现若干真实缺陷，需要在不改变既有设计语言与交互逻辑的前提下修复。

## What Changes
- 修复视口尺寸变化后相机不重新取景：设备竖屏切横屏/桌面时，船队全景沿用旧机距，出现船体偏小、偏移甚至被裁切。
- 可访问性修复：
  - 允许页面缩放（移除 `maximum-scale=1,user-scalable=no`）。
  - 增加 `:focus-visible` 键盘焦点样式。
  - 折叠后的设置面板、隐藏的详情卡使用 `inert` + `aria-hidden`，不再被 Tab/读屏命中。
  - 为缺失的输入补 `aria-label`；为动态生成的数字框与图层复选框补 `id/name`。
  - 为三维画布提供可访问名称。
  - 支持 `prefers-reduced-motion`：压缩 CSS 过渡，并让相机飞行立即完成。
- 增加 `<noscript>` 降级提示。
- 保留 `全部船体规划.md`：`index.html` 的「出处」面板仍以 `./全部船体规划.md` 引用该文件，不删除、不移除引用。
- 不新增外部依赖，不拆分单文件，不改动船体尺寸、史料数据、视觉主题与既有交互。

## Impact
- Affected specs: 船队三维页面（单文件）的多端适配与可访问性
- Affected code: `index.html`（CSS 第 8–358 行、HTML 360–620 行、JS 1100–7045 行）

## ADDED Requirements
### Requirement: 尺寸变化后的取景稳定性
系统 SHALL 在视口尺寸变化后，对船队全景重新取景，使五艘船完整落入可视区域并适配右侧面板占位。

#### Scenario: 手机竖屏切到桌面横屏
- **WHEN** 视口从 390×844 变为 1440×900，且当前处于船队全景
- **THEN** resize 结束后相机按新宽高比重新取景，五船完整入画，不再出现旧机距导致的偏小/偏移

#### Scenario: 桌面缩到手机竖屏
- **WHEN** 视口从 1440×900 缩到 390×844，且当前处于船队全景
- **THEN** 五船仍完整入画，HUD/底部提示/设置按钮不重叠

### Requirement: 可访问性基线
系统 SHALL 提供键盘、读屏与减少动态效果场景下的可用性基线。

#### Scenario: 键盘遍历
- **WHEN** 用户使用 Tab 键遍历页面
- **THEN** 所有可聚焦控件有可见焦点环；折叠面板和隐藏详情卡不进入焦点顺序

#### Scenario: 表单可访问名称
- **WHEN** 读屏软件读取设置面板
- **THEN** 每个 input/select 都能读出名称；动态生成的数字输入与图层复选框具备 `id` 或 `name`

#### Scenario: 页面缩放
- **WHEN** 用户在移动端双指缩放
- **THEN** 页面允许缩放，不再被 viewport 禁用

#### Scenario: 减少动态效果
- **WHEN** 系统开启 `prefers-reduced-motion: reduce`
- **THEN** CSS 过渡被压缩，相机飞行立即到位

### Requirement: 无脚本降级提示
系统 SHALL 在 JavaScript 不可用时显示可读提示，而不是空白画布。

#### Scenario: 禁用 JavaScript
- **WHEN** 浏览器禁用 JavaScript 打开页面
- **THEN** 显示「需启用 JavaScript」的提示文案

## MODIFIED Requirements
### Requirement: 多端适配完整（既有）
保持桌面、平板、手机横竖屏现有布局与断点，不引入新的溢出、遮挡或不可点击区域。

## REMOVED Requirements
N/A
