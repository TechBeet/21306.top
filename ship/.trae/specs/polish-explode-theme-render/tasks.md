# Tasks

- [x] Task 1: 拆解视图重构
  - [x] SubTask 1.1: 以船体形心 (4.8, 1.1, 0) 为原点，为每个构件计算径向方向
  - [x] SubTask 1.2: 重写 `explodeDir`：径向 + 分集合竖向基准（龙骨 −2.0、舱壁 +1.2、肋骨 3.8、壳板 2.0/3.2/4.4 并逐层抬高 0.5/1.6/2.7、舵系 −3.4、桅座 +2.6、保寿孔 +3.6、推演层 +5.0）
  - [x] SubTask 1.3: 按集合写入错峰延迟（0–0.24），`applyExplode` 改为逐件错峰缓动
  - [x] SubTask 1.4: 新增「拆解视角」按钮：飞至 (31,22,34) + 爆炸滑杆同步至 65%；爆炸时自动收回视图偏移，避免构件飞出取景

- [x] Task 2: 移除审计与自检
  - [x] SubTask 2.1: 删除「显示」页的审计 / 自检 DOM 与 `.audit` / `.arow` 样式
  - [x] SubTask 2.2: 删除 `AUDIT` / `addAudit` / `renderAudit` / `selfCheck` / `runSelfCheck` 及调用

- [x] Task 3: 双主题 UI
  - [x] SubTask 3.1: 颜色抽为 CSS 变量，新增 `html[data-theme="light"]` 覆盖（背景、面板、卡片、边框、文字、强调、测量色）
  - [x] SubTask 3.2: 面板头部主题按钮 ☀/☾，读写 `localStorage`，首访跟随 `prefers-color-scheme`
  - [x] SubTask 3.3: 适配面板、抽屉、详情卡、图层树、滑杆、按钮、标签、提示条；加载页固定深色以保证对比度

- [x] Task 4: UI 布局与细节
  - [x] SubTask 4.1: HUD 改为玻璃卡片，面板头部 / 标签栏 / 分组间距统一
  - [x] SubTask 4.2: 详情卡标题层级、尺寸表、来源链接按钮化
  - [x] SubTask 4.3: 桌面端视图偏移让船体居中于面板左侧可用区；移动端面板默认收起为底部抽屉，卡片与提示条避让

- [x] Task 5: 程序化木纹与 PBR 材质
  - [x] SubTask 5.1: 每种木材生成 albedo（长纹/年轮/节疤/风化/颗粒）+ roughness + bump 三图
  - [x] SubTask 5.2: `woodMat` 升级为三贴图材质（bumpScale 0.016、envMapIntensity 0.45）
  - [x] SubTask 5.3: 每件实例 ±6% 明度扰动，避免同色
  - [x] SubTask 5.4: 铜镜 / 帆布 / 捻料 / 绳索材质同步调整

- [x] Task 6: 环境反射与天空
  - [x] SubTask 6.1: `PMREMGenerator.fromScene` 生成天空环境贴图，赋给 `scene.environment`
  - [x] SubTask 6.2: `applyEnv` 结束后 380 ms 防抖重建，失败降级为无环境贴图
  - [x] SubTask 6.3: 天空日晕、地平线过渡、夜间星点层次

- [x] Task 7: 海面着色升级
  - [x] SubTask 7.1: 六波叠加 + 解析法线，新增细节涟漪法线
  - [x] SubTask 7.2: 太阳镜面高光（随 uRough 改变高光宽度）、天空菲涅尔反射
  - [x] SubTask 7.3: 波峰泡沫噪声、雾融合
  - [x] SubTask 7.4: 新增 CSS 暗角叠层（不拦截事件，随主题变化）

- [x] Task 8: 浮力物理升级
  - [x] SubTask 8.1: 9 个横剖面，按局部波高求浸深，用剖面系数近似浸没面积
  - [x] SubTask 8.2: 浮力合力与力矩驱动 heave / pitch / roll，左右舷分别采样
  - [x] SubTask 8.3: 等效质量、附加惯量、线性阻尼、角度/升沉限幅
  - [x] SubTask 8.4: 参数面板接线（g / 浮力刚度 / 阻尼 / 暂停 / 复位姿态）

- [x] Task 9: 加载细分
  - [x] SubTask 9.1: `Progress` 扩为 13 阶段，新增阶段清单 DOM 与权重
  - [x] SubTask 9.2: 各构建阶段上报构件计数（龙骨 3/3、舱壁 12/12、肋骨 24/24、壳板 156/156、其余构件 19/19、推演 12/12）
  - [x] SubTask 9.3: 进度百分比插值平滑，阶段切换时 16 ms 让出绘制

- [x] Task 10: 回归验证
  - [x] SubTask 10.1: 浏览器实测：爆炸 100% / 归零、拆解视角、主题切换与持久化、复原切换、物理暂停、残深线
  - [x] SubTask 10.2: 控制台无 uncaught error（仅剩一条无障碍提示），桌面 160 FPS，移动端布局正常

# Task Dependencies

- Task 1 独立
- Task 2 独立
- Task 3 是 Task 4 的前置（变量体系）
- Task 5、6、7 相互独立；Task 6 依赖 Task 5 的材质参数接线
- Task 8 依赖 Task 7（波高函数复用）
- Task 9 与其余任务并行
- Task 10 在全部完成后执行
