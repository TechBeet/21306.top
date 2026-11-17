# Tasks

- [x] Task 1: 船队数据层与命名空间
  - [x] SubTask 1.1: 定义 `FLEET_SPEC`（五船：`quanzhou` / `pengla` / `belitung` / `guangchuan` / `zhenghe`），含 `cnName/type/grade/gradeNote/envelope/draft/xcg/sources`
  - [x] SubTask 1.2: 构件 id 采用 `shipId::partId` 复合键；`PARTS` / `PART_MESHES` 增加 `ship` 字段
  - [x] SubTask 1.3: 分组改为按船嵌套（`SHIP_GROUPS[shipId][coll]`），`COLL_DEFS` 作为系统模板
  - [x] SubTask 1.4: 新增 `SHIPS` 注册表（`{id, spec, root, parts, bbox, state}`）与 `registerLegacyShip()`，泉州几何代码未动
  - [x] SubTask 1.5: 泉州船改造后构件数 249、id 前缀 `QS_*`、图层归属与详情卡均与改造前一致

- [x] Task 2: 参数化造船管线
  - [x] SubTask 2.1: `makeProfile(stations, opts)` 生成 `halfBeam / keelTop / sheer / hullPoint / hullNormal / zAtY`，不引用泉州全局常量
  - [x] SubTask 2.2: `buildShip(spec)` 骨架：注册 root → 建分组 → 建型线 → 按 `build` 数组调用 builder → 计算 bbox
  - [x] SubTask 2.3: `buildPlankShell` 支持单层 / 二重 / 三重，支持逐行厚度与搭接阶
  - [x] SubTask 2.4: `buildBulkheads` / `buildFrames` 按站位生成，支持肋骨前装 / 后装与 `mergeId` 合并
  - [x] SubTask 2.5: `grade` 从 `defPart` 贯通到 `PARTS`、详情卡与图层树

- [x] Task 3: 蓬莱古船（沙船型快速船，A 级）
  - [x] SubTask 3.1: 站位表 32 × 6.0 × 2.6 m、吃水 1.8 m，方首方尾、首尾上翘（残体 28.8 × 5.6 × 0.9 标注在说明）
  - [x] SubTask 3.2: 主龙骨 17.06 m，6 号舱壁 430×300 → 尾 200×280 → 首 375×250，梯形断面、舱壁处折点
  - [x] SubTask 3.3: 尾龙骨 5.58 m、首材、钩子同口 470 mm 倒钩榫舌（备选 720 mm 常量）
  - [x] SubTask 3.4: 单层外板 280 → 120 mm 逐行厚度梯度
  - [x] SubTask 3.5: 12 道舱壁 65 mm、前桅座（200 孔）、主桅座（双孔 260 / 孔距 320）、三块叠压舵承座（100/100/260、孔径 300）
  - [x] SubTask 3.6: 铲钉示意（间距 150 mm、距边 40–50 mm），标注为规则分布
  - [x] SubTask 3.7: 帆装复原件（主桅 26.72 m / 540 mm / 后倾 1° / 229.5 m²；尾桅 12.5 m；舵叶 4.3×1.75 m），C 级标注
  - 构件数：56

- [x] Task 4: 黑石号（阿拉伯缝合帆船，B 级）
  - [x] SubTask 4.1: 龙骨 15.3 m、厚 150 mm、首柱 61°、外壳 21 × 7.5 × 3.0 m（并列 18 × 6.4 m 口径）
  - [x] SubTask 4.2: 壳板分缝与板列，板缝曲线作为孔列路径
  - [x] SubTask 4.3: 贯穿孔列，孔距 45 mm（4–5 cm 区间常量）、距板边 20 mm，InstancedMesh 共 3244 孔（1/3 抽样示意）
  - [x] SubTask 4.4: 椰壳纤维绳沿板缝连续 Tube（20 条）
  - [x] SubTask 4.5: 板缝填料 8 mm 薄层
  - [x] SubTask 4.6: 内龙骨独立于主龙骨；14 根肋骨按推演断面
  - [x] SubTask 4.7: 「类型学推演帆装」集合，文案明确非帆装复原
  - 构件数：43

- [x] Task 5: 广船（乌尾 / 东莞船，C 级）
  - [x] SubTask 5.1: 外壳 31.5 × 9.75 × 3.6 m、单层 230 mm、头尖体长、上宽下窄、尖底
  - [x] SubTask 5.2: 铁力木材质（深色、高粗糙度）
  - [x] SubTask 5.3: 56 根肋骨（肋距 0.527 m）+ 8 道隔舱板 + 大擸 + 多孔舵
  - [x] SubTask 5.4: 推演件统一 `_inferred_from_typology` 与「（推演）」后缀
  - 构件数：38

- [x] Task 6: 郑和宝船（71.1 m 南京复建方案，D 级）
  - [x] SubTask 6.1: 包络 71.10 / 48.42 / 14.05 / 6.10 / 4.60 m
  - [x] SubTask 6.2: 福船尖底 V 龙骨 + 龙骨翼板，断面按泉州谱系比例推演
  - [x] SubTask 6.3: 72 根肋骨均布，肋距实测 0.682 m
  - [x] SubTask 6.4: 二层甲板、六桅六帆、主桅总高 38.00 m（桅顶 y=33.40）
  - [x] SubTask 6.5: 11.07 m 舵杆作为「考古实物参照」独立陈列，不绑定
  - [x] SubTask 6.6: 命名全程「南京复建方案 71.1m」
  - 构件数：117

- [x] Task 7: 船队布局、聚焦与视角
  - [x] SubTask 7.1: 1:1 布局，泉州原位，其余 `x=4.8`，z 为 −14.80 / −29.55 / +16.68 / +36.58
  - [x] SubTask 7.2: `fleet` 视角按包围球 fit，从 −z 侧斜俯视避开宝船遮挡
  - [x] SubTask 7.3: `focusShip(id)` 0.9 s 缓动、更新徽标、船队卡高亮
  - [x] SubTask 7.4: 8 个视角改为作用于聚焦船（`scaledView` 按 bbox 长度缩放）
  - [x] SubTask 7.5: `localStorage['qs-fleet']` 持久化并启动恢复

- [x] Task 8: 逐船物理与浪花参数化
  - [x] SubTask 8.1: `ensureShipState` / `shipPhysicsStep` 逐船独立，参数来自 `spec` 与 `profile`
  - [x] SubTask 8.2: 聚焦船 15×5 浮力积分；非聚焦船简化漂浮（≤1.2°、6–11 s）
  - [x] SubTask 8.3: 浪花站位由 `spec` 船长生成，仅聚焦船发射
  - [x] SubTask 8.4: 吃水实测 1.25 / 1.80 / 1.60 / 2.40 / 4.60 m，船底位置正确

- [x] Task 9: 精度标注与船队 UI
  - [x] SubTask 9.1: 「船队」标签页五张卡片（名称 / 船型 / 主尺度 / 精度徽标 / 构件数）
  - [x] SubTask 9.2: 精度图例 4 条 + 筛选（勾 D 后仅宝船实体，其余半透明）
  - [x] SubTask 9.3: 四级图层树（船 → 系统 → 部位 → 构件），跨船搜索自动展开
  - [x] SubTask 9.4: 详情卡精度徽标、所属船名、实测/推演标签
  - [x] SubTask 9.5: 「出处」页船队精度对照表

- [x] Task 10: 加载、性能与 API
  - [x] SubTask 10.1: 阶段表 9 项（初始化 → 木纹 → 海水天空 → 泉州 → 蓬莱 → 黑石号 → 广船 → 宝船 → 装配）
  - [x] SubTask 10.2: `count()` 改为阶段内相对进度
  - [x] SubTask 10.3: 阴影正交范围跟随聚焦船；移动端非聚焦船关闭投影、宝船壳板列数 15 → 9
  - [x] SubTask 10.4: `getFleet / focusShip / getShip / setShipVisible / getGrades / getPartGrade / getShipParts`，`getPose(sid)` 按船
  - [x] 新增 `docs/fleet-specs.md` 船队说明

- [x] Task 11: 回归验证
  - [x] SubTask 11.1: 泉州构件数 249、图层、详情卡、默认构图与改造前一致
  - [x] SubTask 11.2: 五船吃水正确、无穿插、无浮空
  - [x] SubTask 11.3: 船队全景 / 单船聚焦 / 视角切换正常，缓动无跳变
  - [x] SubTask 11.4: 精度筛选、图例、推演标识正确
  - [x] SubTask 11.5: 桌面 140 fps（聚焦）/ 65–68 fps（全景）；控制台无 JS 错误

# Task Dependencies

- Task 3 / 4 / 5 / 6 依赖 Task 1 与 Task 2
- Task 7 依赖 Task 1；UI 部分与 3–6 并行
- Task 8 依赖 Task 1，多船吃水需至少两船建成
- Task 9 依赖 Task 1 与 Task 2
- Task 10 依赖 Task 3–6
- Task 11 在全部完成后执行

# 回归修复记录

- [x] 「船队全景」相机被宝船遮挡：改用包围球 fit，方向取 −z 侧斜俯视
- [x] 非聚焦船 `getPose` 恒为 0：`shipSimpleFloat` 未同步 state，已补写
- [x] 残体模式隐藏新船帆装：fade 仅作用于泉州船
- [x] 黑石号壳板路径误显示「三重壳板」：按船型分 `PLANK_LABEL`
- [x] 聚焦单船时其余船帆体遮挡视线：相机靠近时其余船降至 18%，全景自动恢复
- [x] 泉州聚焦时徽标丢失残体/复原文案：按船分文案拼接
- [x] 移除子代理遗留的 `.screenshots` 临时图与预览文件
