# Tasks

- [x] Task 1: 船尾水密闭合
  - [x] SubTask 1.1: 尾封板外轮廓改用最外层壳板外表面（0.181 m + 搭接阶 + 0.008 m 余量），从 `X_STERN - 0.02` 向内挤出 0.24 m
  - [x] SubTask 1.2: 壳板起点由 `X_STERN + 0.001` 改为 `X_STERN - 0.03`，与尾封板重叠
  - [x] SubTask 1.3: 新增尾端环形封边条（宽约 42 mm、厚 50 mm），封闭三层板端面台阶
  - [x] SubTask 1.4: 新增尾封板内侧水密隔板 `QS_Transom_Inner`（厚 60 mm，X = -5.10）
  - [x] SubTask 1.5: 三个新构件注册 `PARTS`（中文名 / 尺寸 / 出处 / 图层归属）
  - [x] SubTask 1.6: 水线、船尾、船内三个视角检查，无透光缝隙

- [x] Task 2: 参数规格表与滑杆重建
  - [x] SubTask 2.1: 定义 `PARAM_SPEC`（label/unit/min/max/step/scale）
  - [x] SubTask 2.2: 统一量程：`amp 0–1.2`、`chop 0–1.2`、`wl 0.5–2.0`、`foam 0–2.0`、`alpha 0.2–1.0`、`whitecap 0–2.0`、`foamDecay 0.4–10`、`splash 0–2.0`、`g 1–20`、`bk/bc 0.1–3.0`、`gSwell/gWind/gChop 0–2.0`
  - [x] SubTask 2.3: 滑杆属性由规格表写入，`syncEnvUI / bindEnv` 统一走 `data-param` 并夹取
  - [x] SubTask 2.4: `applyEnv` 开头 `clampEnv()`，旧存档越界值自动收敛

- [x] Task 3: 数值直接输入
  - [x] SubTask 3.1: 28 个数值参数均增加 `type="number"` 输入框
  - [x] SubTask 3.2: 双向同步：滑杆 → 数字框、数字框 → 滑杆与 `env`
  - [x] SubTask 3.3: Enter / 失焦提交，越界夹取并回显，空值或 NaN 回退上一有效值
  - [x] SubTask 3.4: 输入框 56 px、`inputmode` 数字键盘，移动端面板无溢出

- [x] Task 4: 自定义预设
  - [x] SubTask 4.1: 面板新增「自定义预设」：名称输入、保存、应用、删除、恢复默认
  - [x] SubTask 4.2: 预设快照包含 `PARAM_SPEC` 全部键 + 颜色/开关/天气等字段
  - [x] SubTask 4.3: 持久化 `localStorage['qs-presets']`，最多 20 条，刷新后保留
  - [x] SubTask 4.4: 应用预设时同步滑杆、数字框、天气按钮与音频天气

- [x] Task 5: 天空云层与闪电
  - [x] SubTask 5.1: 天空着色器 4 层 fbm 云，uniform `uCloud / uWind / uTime`
  - [x] SubTask 5.2: `uFlash` 短时提亮天空与地平线
  - [x] SubTask 5.3: `lightning` 概率触发，联动半球光 / 曝光 / 雷声
  - [x] SubTask 5.4: 云量、雾、太阳、半球光、曝光按 τ=0.65 s（约 2 s）平滑过渡

- [x] Task 6: 雨幕粒子与水面雨滴
  - [x] SubTask 6.1: `LineSegments` 雨滴池（桌面 1800 / 移动 700），按 `windDir` 倾斜
  - [x] SubTask 6.2: 相机周围 ±36 m 圆柱循环，落地回收，数量与长度、透明度随 `rain` 变化
  - [x] SubTask 6.3: 海面 `uRain` 细波纹与零星泡沫
  - [x] SubTask 6.4: `rain ≤ 0.02` 时雨幕隐藏且跳过更新

- [x] Task 7: 天气预设扩展与音频联动
  - [x] SubTask 7.1: `WEATHER` 扩展为 7 档并补齐 cloud/rain/lightning/windSpeed/windDir/haze
  - [x] SubTask 7.2: `WEATHER_AUDIO` 增加 lightRain / heavyRain，雷声改由闪电事件触发
  - [x] SubTask 7.3: 天气按钮 7 档两行自适应
  - [x] SubTask 7.4: 切换天气重置闪电计时，云/雨自动平滑收敛

- [x] Task 8: 文档与参数接口
  - [x] SubTask 8.1: `docs/water-audio-params.md` 更新量程、数字输入、自定义预设、天气细节、7 档双表
  - [x] SubTask 8.2: `ShipApp` 增加 `savePreset / applyPreset / removePreset / listPresets / resetParams`

- [x] Task 9: 回归验证
  - [x] SubTask 9.1: 船尾/水线视角无缝隙；三件新构件在图层树中可见
  - [x] SubTask 9.2: 7 档天气切换无残留；小雨与大雨雨幕差异明显
  - [x] SubTask 9.3: 数字输入 0.83 → amp 0.83、999 → 1.2、空值回退；预设保存/应用/删除/刷新恢复全部可用
  - [x] SubTask 9.4: 桌面 144 fps；控制台无 error / warn

# Task Dependencies

- Task 3 依赖 Task 2（规格表）
- Task 4 依赖 Task 2 与 Task 3（完整快照与输入控件）
- Task 6.3 依赖 Task 7.1（`rain` 参数）
- Task 7 依赖 Task 5 / Task 6（云、雨、闪电对象存在）
- Task 8 / 9 在功能完成后执行

# 回归修复记录

- [x] 数字输入框初版按百分数解释（输入 0.83 得到 0.0083），改为数字框使用 `env` 物理原值、滑杆使用百分比
- [x] 数字框浮点尾差（0.70001 / 1.1500），改为按 `step` 精度 `toFixed`
- [x] `qs-water` 未保存新增天气字段，导致刷新后 cloud/rain 归零；`WATER_KEYS` 扩至 24 键
- [x] `haze` 未接入，补为雾密度乘子并压低太阳强度
- [x] 雨滴长度未随雨强变化，补 `0.55 + 0.45·rain` 与透明度联动
- [x] 天气切换光照/雾瞬时跳变，补 τ=0.65 s 平滑
