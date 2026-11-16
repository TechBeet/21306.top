# Tasks

- [x] Task 1: 重建数据基座与构件注册机制
  - [x] SubTask 1.1: 定义 `SHIP` 常量：X 包络（−5.25 / 12.4 / 14.83）、型宽 7.60、舷弧 2.36→3.50、吃水 0.85、船中 X_MID、毫米→米换算基准
  - [x] SubTask 1.2: 重写型线函数 `halfBeam(x)` / `sheerY(x)` / `zAtY(x,y)` / `hullPoint(x,s)`，首尾收敛到龙骨半宽 0.21
  - [x] SubTask 1.3: 实现 `defPart/attach` 注册机制，统一写入 `{id, name, coll, species, source, dims, note}`
  - [x] SubTask 1.4: 建立 `00_Keel`～`07_Rigging_Inferred` 八个 THREE.Group 与集合元信息（中文名、数量、爆炸方向）
  - [x] SubTask 1.5: 13 舱段不等距序列（首尾短、中部长），归一化到 X −4.35→13.15，写入 `QS_Bulkhead_Spacing.spacing_profile`

- [x] Task 2: 龙骨系统三梁与直角同口
  - [x] SubTask 2.1: `QS_Keel_Main` 12.4×0.42×0.27，松木，写入 `section_mm="420x270"`、`length_m=12.4`
  - [x] SubTask 2.2: `QS_Keel_Stern` X 0→−5.25，根部断面 420×270，端部台阶与尾端上翘
  - [x] SubTask 2.3: `QS_Stem` 参数化圆弧（自 X=12.4 前上弯），弧长回读 4.500 m
  - [x] SubTask 2.4: 主/尾龙骨、主/首柱两个接头各生成 340 mm 阶梯端面（两件独立、互不 Join），写入 `joint_type` / `joint_length_mm` / `fastener`
  - [x] SubTask 2.5: 生成 `QS_Anchor_*` 与 `QS_Marker_Baoshou_*` 定位空对象

- [x] Task 3: 12 道舱壁 / 13 舱
  - [x] SubTask 3.1: 由 13 段序列推导 12 个舱壁 X 坐标（尾→首编号 B01…B12）
  - [x] SubTask 3.2: 用横向轮廓采样生成舱壁外形（贴合内壳、宽度 = 型宽 − 2×壳厚），`ExtrudeGeometry` 厚度 0.11
  - [x] SubTask 3.3: 舱壁下缘中线开 0.120×0.120 真孔（Shape hole），孔缘 5 mm 倒角
  - [x] SubTask 3.4: 最下一列橡木（同样开孔）、上部杉木；写入 `thickness_mm`、`lowest_strake_material`、`upper_strakes_material`

- [x] Task 4: 肋骨与前后装位差异
  - [x] SubTask 4.1: 沿舱壁—壳板交线生成 24 根独立肋骨（0.28 × 0.14 m），下起龙骨上表面、上至舷侧
  - [x] SubTask 4.2: 按 X < X_MID / X > X_MID 逐舱判定 `aft_of_bulkhead` / `forward_of_bulkhead`，偏移量 = 舱壁半厚 + 肋骨半厚 + 0.005
  - [x] SubTask 4.3: 信息卡输出 `mount_side` 与树种，肋骨按装位方向写入说明

- [x] Task 5: 三重壳板与搭接阶
  - [x] SubTask 5.1: 按 13 列生成内/中/外三层，沿 X 分 2 段（9.65 / 9.98 m），命名 `QS_Planking_{Inner|Mid|Outer}_P07_S03`
  - [x] SubTask 5.2: 搭接阶由列级边缘偏移控制（13 列分 2/2/2/3/4 列五段，阶高 14 mm）
  - [x] SubTask 5.3: 板端接缝台阶深取板厚/3，X=4.70 m 处设整圈捻料缝
  - [x] SubTask 5.4: 第 1–2 列樟木、其余杉木；写入 `thickness_mm`、`strake_column`、`scarf_type`

- [x] Task 6: 舵承座与舵系占位
  - [x] SubTask 6.1: `QS_Rudder_Bearing` 带 Ø0.38 孔、孔轴倾斜 22°、埋入未穿透
  - [x] SubTask 6.2: `QS_Rudder_Stock_Inferred` Ø0.35×5.2 m 占位圆柱，与孔轴同轴，`source="inferred_from_bearing"`，仅复原模式显示

- [x] Task 7: 桅座与推演帆装层
  - [x] SubTask 7.1: `QS_Mast_Step_Main_Inferred` 3.0×0.55×0.30 带 0.26×0.26 方孔，樟木，`source="inferred"`
  - [x] SubTask 7.2: 甲板、舷墙扶栏、甲板室迁入 `07_Rigging_Inferred`，按新舷弧重排
  - [x] SubTask 7.3: 三桅按 22 m 级福船等比（×24.2/22）：中桅 14.0 / 头桅 10.6 / 尾桅 7.8，`source="scaled_from_22m_fuchuan_replica"`；帆与索具仅作推演层

- [x] Task 8: 「七星伴月」保寿孔
  - [x] SubTask 8.1: 在两处榫合接头上表面定孔位（主龙骨尾端 X=0、首端 X=12.4）
  - [x] SubTask 8.2: 生成 1 个 Ø0.13 月孔 + 7 个 Ø0.045 星孔，北斗七星布局，半径 0.105，深度 0.09
  - [x] SubTask 8.3: 以「凹窝 + 铜色底」实现（不用布尔），16 个孔各自独立对象归入 `06_Cultural_Marks`，名称后缀 `_inferred`

- [x] Task 9: 交互、呈现模式与审计面板
  - [x] SubTask 9.1: 残体 / 复原双层模式切换（只改可见性），角标与提示文案同步
  - [x] SubTask 9.2: 图层树（8 集合 → 子类 → 单件）、Raycaster 拾取、高亮与信息卡
  - [x] SubTask 9.3: 单件隔离 / ESC 恢复、爆炸视图滑杆、线框、按来源着色、水面半透
  - [x] SubTask 9.4: 尺寸审计面板：运行时包围盒回算 11 项，显示实测值、偏差与通过状态，超差不修正

- [x] Task 10: 修复既有缺陷与性能收尾
  - [x] SubTask 10.1: 修复 `mergeGeometries` 丢弃索引问题（`toNonIndexed()` 结果被正确使用），结构件不再合并
  - [x] SubTask 10.2: 修复相机补间与控制器每帧回写冲突；八个预设视角按新包络重标定
  - [x] SubTask 10.3: 应用吃水偏移（船体下沉 0.85 m）并重算浮力采样点权重
  - [x] SubTask 10.4: 阴影与网格数量控制（捻料缝/橡木压条不投影），实测 160 FPS；移动端面板布局回归

# Task Dependencies

- Task 2 / 3 / 4 / 5 / 6 / 7 / 8 均依赖 Task 1（型线、注册表、集合）
- Task 4 依赖 Task 3（肋骨沿舱壁定位）
- Task 5 依赖 Task 1（型线）与 Task 3（舱壁位置用于对齐列）
- Task 8 依赖 Task 2（接头锚点与龙骨走向）
- Task 9 依赖 Task 1～8（需要构件与元数据齐全）
- Task 10 可与 Task 9 并行，但 10.2 / 10.3 需在 Task 9 视角与浮力联调前完成
- Task 3、Task 5、Task 8 相互独立，可并行推进
