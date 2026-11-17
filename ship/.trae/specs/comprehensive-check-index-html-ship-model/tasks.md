# 任务

- [x] 任务 1: 修复视口尺寸变化后船队全景不重新取景的问题
  - [x] 子任务 1.1: 在 `resize` 处理器中防抖（约 120ms）重算取景
  - [x] 子任务 1.2: 仅当 `fleetOverview` 为真时，用 `VIEWS.fleet()` 重置相机位置与 `controls.target`，并取消进行中的 `flyTween`
  - [x] 子任务 1.3: 保持非船队全景（单船/自由环绕）时用户当前视角不被强行重置

- [x] 任务 2: 可访问性与降级
  - [x] 子任务 2.1: viewport 移除 `maximum-scale=1,user-scalable=no`
  - [x] 子任务 2.2: 增加 `:focus-visible` 焦点环与 `prefers-reduced-motion` 媒体查询
  - [x] 子任务 2.3: `setPanelCollapsed` 同步 `inert`、`aria-hidden`、打开按钮 `aria-expanded`
  - [x] 子任务 2.4: `showCard` / `hideCard` 同步详情卡 `inert` 与 `aria-hidden`
  - [x] 子任务 2.5: 为 `presetName`、`treeSearch`、动态图层复选框补可访问名称；为动态数字框补 `id/name`；将「实时帧率」的无效 `<label>` 改为 `<span class="lbl">`
  - [x] 子任务 2.6: 为画布设置可访问名称；`flyTo` 在减少动态效果时立即完成
  - [x] 子任务 2.7: 增加 `<noscript>` 降级提示

- [x] 任务 3: 回归验证
  - [x] 子任务 3.1: 桌面 1440×900 与 1024×600 检查布局、渲染、控制台
  - [x] 子任务 3.2: 手机 390×844、375×667、横屏 844×390 检查布局
  - [x] 子任务 3.3: 冒烟交互：标签页 / 主题 / 残体复原 / 换船 / 拆解 / 预设 / 音频 / 结构树 / 构件卡 / 键盘快捷键（全部通过，无运行时错误）
  - [x] 子任务 3.4: 复测「竖屏 → 横屏」与「横屏 → 竖屏」取景；控制台无新增错误

- [x] 任务 4: 逐项勾选 `checklist.md` 并给出最终质检结论

# 任务依赖
- 任务 2、任务 1 都修改 `index.html`，需串行执行。
- 任务 3 依赖任务 1、2 完成。
- 任务 4 依赖任务 3 完成。

# 验证记录
- 视口切换：1440×900 → 390×844 → 1440×900，船队全景均完整入画；修复前横屏回切会沿用旧机距导致偏小/偏移。
- 浏览器控制台：无 error、无 DevTools issue（修复前为 38 条无 label + 28 条无 id/name）。
- Lighthouse（snapshot, desktop）：Accessibility 100、Best Practices 100、SEO 75（仅缺 meta description，属非阻塞观察项）。
- 键盘：Tab 焦点环为 2px `--accent`；折叠面板与隐藏详情卡无法被程序聚焦。
- 减少动态效果：`prefers-reduced-motion: reduce` 下过渡时长 0.01ms，相机在 0.6s 内完成 900ms 机位切换。
- 静态检查：无缺失 `getElementById`/`querySelector` 引用；两段内联脚本 `node --check` 通过。
- 文件：`index.html` 7101 行（+60 / -8）；`全部船体规划.md` 保留，`SOURCES.plan` 链接仍指向该文件。
