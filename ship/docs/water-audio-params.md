# 泉州湾宋代海船 · 水体与声音参数说明

本文对应 `index.html`（单文件、Three.js r160）。所有声音均由 Web Audio 程序化合成，页面不加载任何外部音频文件；Three.js 由 CDN 加载（3 个回退源，各 4.5 s 超时），其余资源全部内联。

## 1. 系统组成

- 渲染：9 波层叠海浪（顶点着色器）、泡沫场（512²/256² 双缓冲 RT）、船–浪碰撞浪花（CPU 粒子池 + 点精灵）、按海底深度着色的水体体积感。
- 声音：环境声、拍击/撞击碰撞声、程序化混响，全部由 Web Audio 实时合成，无任何音频文件；`env` / `audioParams` 驱动着色器 uniform 与音频节点，对外经 `ShipApp`、`ShipAudio` 暴露。

## 2. 水体参数（`env` 键）

| 字段 | 含义 | 范围 | 默认 | 影响 |
| --- | --- | --- | --- | --- |
| `amp` | 整体浪高系数（无量纲） | 0–1 | 0.30 | 振幅 `a = steep·amp/k`，线性影响船体垂荡/纵摇 |
| `chop` | 垂直放大与波陡 | 0–1 | 0.50 | 垂直位移额外 ×`chop`×3；同时使高光粗糙度 `0.22+0.45·chop` 变粗 |
| `wl` | 波长倍率 | 0.5–2.0 | 1.0 | 统一乘到 9 个波长，越大越平缓、周期越长 |
| `dir` | 浪向偏移（度） | 0–360 | 0 | 加到所有波方向；同时旋转泡沫漂移方向 |
| `foam` | 泡沫总强度 | 0–1.5 | 1.0 | 乘在“雅可比白浪 + 泡沫场 + 岸线泡沫”合并掩码上 |
| `whitecap` | 瞬态白浪增益 | 0–2 | 1.0 | 仅放大雅可比白浪，不改变持久泡沫场 |
| `foamDecay` | 泡沫衰减时间常数（s，UI 标“半衰期”） | 0.6–8 | 3.2 | 每帧 `prev·exp(-dt/foamDecay)`；3.2 约 2.2 s 衰减一半 |
| `foamGen` | 泡沫生成强度兼开关 | 0–2 | 1.0 | 生成源 `smoothstep(0.46, 0.12, J)·foamGen`；≤0.02 时海面不采样泡沫纹理 |
| `bedOn` | 海底 / 浅滩 | 布尔 | true | 控制深度着色、岸线泡沫与海底网格显隐；X 光透视下自动隐藏 |
| `hullFoam` | 船体足迹泡沫环 | 0–1 | 0.8 | 椭圆环 `10.5 m × 4.2 m`，0.86→0.94 淡入、0.99→1.05 淡出，强度 ×0.55 |
| `splash` | 浪花强度 | 0–2 | 1.0 | 缩放发射冲量 `imp`，联动初速、粒径与粒子数 |
| `splashOn` | 浪花总开关 | 布尔 | true | 关闭后停止发射并隐藏粒子对象 |
| `gSwell` | 涌浪组增益 | 0–2 | 1.0 | 写入 `uGain[]`，作用于 3 个 swell 波 |
| `gWind` | 风浪组增益 | 0–2 | 1.0 | 作用于 3 个 wind 波，并影响环境风声目标值 |
| `gChop` | 碎浪组增益 | 0–2 | 1.0 | 作用于 3 个 chop 波，并进入声音的 wave 包络 |
| `g` | 重力加速度 | 1–20 | 9.81 | 色散 `c=√(g/k)`、泡沫场与船体浮力共用 |
| `bk` / `bc` | 浮力刚度 / 阻尼 | 0.2–2 | 1.0 | `F = RHO·g·A·SEC_DX·bk`；阻尼乘子：垂荡 3.0、纵摇 2.2、横摇 2.0 |
| `alpha` | 水面透明上限 | 0.2–1.0 | 0.42 | 无透视时 `mix(0.64, 0.93, absorb)`；透视模式再与 `alpha` 取 min（`uLockAlpha`） |
| `deep` | 深水色 | `#RRGGBB` | `#081a26` | 深水基色 |
| `shallow` | 浅水色 | `#RRGGBB` | `#2695a8` | 浅水/岸线基色 |
| `weather` | 当前天气键 | 5 个预设 | `clear` | 状态记录；切预设覆写 `amp/chop/wl/foam/alpha/whitecap/foamGen/foamDecay/g*` 与光照/雾 |

`setWaterParams` 的可写键为 18 个 `WATER_KEYS`（不含 `weather` 与 `hullFoam`），改天气请用 `setSeaState`；下表为 `WEATHER` 五档预设（另含 `time/sun/warm/amb/exposure/fog`）：

| 天气 | amp | chop | wl | foam | alpha | whitecap | foamGen | foamDecay | gSwell | gWind | gChop |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| clear | 0.26 | 0.45 | 1.00 | 0.90 | 0.42 | 0.80 | 0.85 | 2.8 | 0.90 | 0.85 | 0.80 |
| cloudy | 0.38 | 0.60 | 1.05 | 1.10 | 0.50 | 1.05 | 1.00 | 2.6 | 1.05 | 1.15 | 1.10 |
| mist | 0.12 | 0.28 | 0.90 | 0.50 | 0.55 | 0.45 | 0.60 | 3.4 | 0.55 | 0.50 | 0.45 |
| dusk | 0.22 | 0.50 | 1.00 | 0.80 | 0.42 | 0.85 | 0.85 | 3.0 | 0.90 | 0.90 | 0.85 |
| storm | 0.58 | 0.82 | 1.25 | 1.05 | 0.62 | 1.35 | 1.05 | 2.0 | 1.20 | 1.40 | 1.50 |

## 3. 海浪分层

| # | 组别 | 波长 λ (m) | 方向 (rad) | 陡度 | 相位 |
| --- | --- | --- | --- | --- | --- |
| 1 | swell | 46.0 | 0.55 | 0.20 | 0.0 |
| 2 | swell | 31.0 | 0.78 | 0.14 | 1.7 |
| 3 | swell | 22.0 | 0.32 | 0.10 | 3.1 |
| 4 | wind | 15.5 | 1.02 | 0.16 | 0.6 |
| 5 | wind | 11.2 | 1.28 | 0.13 | 2.2 |
| 6 | wind | 8.4 | 0.82 | 0.10 | 4.0 |
| 7 | chop | 5.6 | 1.66 | 0.08 | 1.2 |
| 8 | chop | 4.2 | 2.06 | 0.06 | 2.8 |
| 9 | chop | 3.1 | 1.34 | 0.05 | 5.1 |

- 波数 `k = 2π/λ`，角频率 `ω = c·k = √(g·k)`，相位 `f = k·(D·x) − c·k·t + φ`，`D = (cos dir, sin dir)`；水平位移 `a = steep·gain·amp/k`，垂直位移 `a·sin(f)·chop·3`。
- 白浪判据：雅可比 `J = (1+axx)(1+azz) − axz²`，着色器用 `smoothstep(0.78, 0.36, J)`，即 `J ≥ 0.78` 无白浪、`J ≤ 0.36` 全白浪；波长下限 0.6 m，避免 `k` 过大走样。
- 表面细节：法线扰动 `detail = 0.055 + 0.028·clamp(foam, 0, 1.5)`；高光日色中性化 `sunHi = mix(uSunCol, 白, 0.72)`，避免低角度暖阳在粗浪/泡沫上形成橙色斑块。

## 4. 泡沫场

- **双缓冲 RT**：桌面 512²、触摸设备 256²；无深度/模板缓冲，Linear 过滤，`foamA/foamB` ping-pong；刷新桌面 60 Hz、移动端 30 Hz（按累计 `dt` 步进，`dt` 上限 0.05 s）。
- **世界范围与漂移**：150 m，中心 `(4.8, 0)`，即 x ∈ [−70.2, 79.8]、z ∈ [−75, 75]，框外用 `inBox` 屏蔽；漂移 0.35 m/s、方向 = `dir` 浪向，采样偏移 `prevUV = uv − drift·dt/150`。
- **衰减与扩散**：`prev` 取 5 点加权（中心 0.44、上下左右各 0.14，偏移 1.5 texel）后 `×exp(−dt/foamDecay)`；生成项 `src·min(1, dt·2.2)` 半隐式累加，防止高帧率跳变。
- **泡沫生成**：雅可比 `J` 经 `smoothstep(0.46, 0.12, J)·foamGen`，即阈值 0.46、内边缘 `0.46−0.34=0.12`。
- **船体足迹环**：椭圆归一化 `q=(p−hullPos)/(10.5, 4.2)`，`smoothstep(0.86, 0.94, r)·(1−smoothstep(0.99, 1.05, r))·hullFoam·0.55`。
- **深度与岸线**：`depth = 水面高 − seabedY`（`seabedY = −max(2, 8+4sin(0.035x+1.3)cos(0.045z)+2sin(0.02(x+z)) − 沙洲)`，沙洲在 `(2,16)` 附近抬高 6 m），钳 0.15–30 m；岸线泡沫 `smoothstep(3.0, 1.2, depth)·bedOn`。
- **海面合成**：泡沫纹理 `smoothstep(0.20, 0.62, raw)`，与雅可比白浪、岸线相加后 `×foam`，再乘噪声 `0.52+0.48·(0.68n1+0.32n2)`；混入色 `(0.84, 0.89, 0.91)`，上限 0.80。
- **关闭方式**：视觉关闭 `foamGen=0`（海面不再采样纹理）或 `foam=0`（不显示任何泡沫）；`hullFoam=0` 只去掉船体环。RT 仍会按固定步长推进，代码未提供停渲染开关，需省 GPU 只能改源码停掉 `renderFoam` 调用。

## 5. 浪花粒子

- 池容量：桌面 900、触摸 350，初始化时一次性分配，运行期零 new。
- 采样点：`x = [-3.2, 0.4, 4.8, 9.2, 13.2]` × 左右舷 `z = ±halfBeam(x)·0.86`，共 10 个。
- 发射判据：相对垂向速度 `rel = hullVy − surfaceVy`，仅当 `rel > 0.30` 或 `rel < −0.55`（m/s）时发射。
- 冲量：`imp = min(1, |rel|/2.2) · splash`，`imp < 0.02` 跳过；每点每次最多 `n = min(6, round(imp·4))` 个。
- 初速：`vx = ±(0.2+0.8·imp) + 0.35 + (seed−0.5)·0.3`；`vy = 1.1 + 2.4·imp + rand·0.7`；`vz = sign(z)·(0.5+1.6·imp)·(0.6+0.8·rand)`；寿命 `0.6 + rand·1.0` s，粒径 `0.05 + 0.10·imp + rand·0.05`。
- 运动：垂直重力 `9.81×0.55`，水平阻尼 `exp(−2.2·dt)`；寿命耗尽或 `y < 水面−0.02` 立即回收（属性清零）。
- 分配策略：从 `splashCursor` 线性扫描首个空闲槽，满了就放弃本帧新增；碰撞音效全局节流 0.12 s，声像按舷侧取 ±0.55。

## 6. 声音参数（`audioParams`）

| 字段 | 含义 | 范围 | 默认 | 作用 |
| --- | --- | --- | --- | --- |
| `on` | 声音总开关 | 布尔 | true | 关闭时 master 平滑降到 0 |
| `master` | 总音量 | 0–1 | 0.8 | 位于压缩器之前 |
| `amb` | 环境总线音量 | 0–1 | 0.7 | 水/风/雨及混响送出 |
| `sfx` | 音效总线音量 | 0–1 | 0.85 | 拍击、撞击、雷声 |
| `wet` | 混响湿声 | 0–1 | 0.35 | 卷积器输出增益 |
| `decay` | 混响衰减时间 (s) | 0.5–5（IR 内部夹 0.2–8） | 2.4 | 改动即重建 IR |
| `muted` | 静音 | 布尔 | false | 与 `on` 同为假时才出声 |
| `weather` | 声音天气键 | clear/cloudy/mist/dusk/storm | clear | 决定水/风/雨增益与雷声 |

## 7. 声音架构

```
ambBus / sfxBus ─┬→ audioMaster ──────────────────────────────┐
                 └→ ambSend / sfxSend → convolver → wetGain ──┴→ compressor → destination
```

- 压缩器：threshold −12 dB、knee 24、ratio 4、attack 0.004 s、release 0.25 s；噪声缓冲：褐噪 4 s（`last=(last+0.02w)/1.02`，输出 ×3.5）、白噪 2 s，首尾 0.08 s 交叉淡化防循环爆音。
- 滤波：水体 lowpass 基准 480 Hz（Q 0.7），按 `wave` 每 0.2 s 目标到 `380+240·wave` Hz，叠加 0.1 Hz 正弦 LFO（±0.18 Hz）；风 bandpass 800 Hz（Q 0.6），目标 `500+600·wind` Hz；雨 highpass 1400 Hz。
- 程序化 IR：0.018 s 预延迟 + `(1−t)^2.6` 指数衰减噪声，左右声道独立生成，时长 = `decay`。
- 拍击 `crash`：白噪 → bandpass 1600→320 Hz 扫频（Q 0.8），0.9–1.6 s，随机声像，间隔 1.4–5.4 s。
- 撞击 `impact`：正弦 `68+42s → 36 Hz`（0.22 s 扫频、0.45 s 包络），叠加 highpass 850 Hz 噪声水花层，0.09 s 节流。
- 雷声 `thunder`：仅 `weather==='storm'`；褐噪 → lowpass 300→60 Hz，1.8–3.0 s，增益 0.40，间隔 9–22 s。

## 8. 天气声音映射

| 天气 | 水体 `water` | 风 `wind` | 雨 `rain` | 备注 |
| --- | --- | --- | --- | --- |
| clear | 0.55 | 0.18 | 0 | 无雨声、无雷 |
| cloudy | 0.60 | 0.30 | 0.16 | 轻雨 |
| mist | 0.32 | 0.10 | 0.05 | 最安静 |
| dusk | 0.45 | 0.15 | 0.03 | 近无雨 |
| storm | 0.95 | 0.62 | 0.55 | 唯一触发雷声 |

目标值通过 `setTargetAtTime(…, 0.5)` 平滑切换；画面预设（`WEATHER`）同时覆写浪高、泡沫、增益等水体字段（见第 2 节）。

## 9. 对外 API

```js
ShipApp.getWaterParams()            // 19 个水体字段快照（含 weather）
ShipApp.setWaterParams({ amp, chop, wl, dir, foam, whitecap, foamDecay,
  foamGen, bedOn, splash, splashOn, gSwell, gWind, gChop, g, deep, shallow, alpha })
ShipApp.setSeaState('storm')        // 等价于点击天气按钮，画面 + 声音同时切换
ShipApp.getAudioParams()            // ShipAudio.getParams()：8 个声音字段副本，不依赖 AudioContext
ShipApp.setAudioParams({ master, wet, decay, weather, ... })
ShipApp.getWeather()                // 当前 env.weather

ShipAudio.init()                    // 首次手势后可手动初始化
ShipAudio.setWeather('storm')       // 仅切声音天气，不改画面
ShipAudio.impact(strength, pan)     // strength 0–1，pan −1…1（浪花用 ±0.55）
ShipAudio.update(dt, { wave, wind, rain })
ShipAudio.setParams({...}) / getParams()
ShipAudio.ready                     // getter：AudioContext 已 running；context() 返回实例或 null
```

```js
ShipApp.setSeaState('storm');                                          // 1) 切到风暴：画面 + 声音
ShipApp.setWaterParams({ whitecap: 1.35, foam: 1.05, foamGen: 1.05 }); // 2) 微调白浪与泡沫，写入 qs-water
ShipApp.setAudioParams({ wet: 0 });                                    // 3) 关闭混响，保留环境声
```

## 10. 性能与兼容

| 项目 | 桌面 | 触摸 / 移动 |
| --- | --- | --- |
| 像素比 DPR | min(dpr, 2) | min(dpr, 1.75) |
| 阴影贴图 | 2048² | 1024² |
| 泡沫 RT | 512² | 256² |
| 浪花池 | 900 | 350 |
| 泡沫刷新 | 60 Hz | 30 Hz |

- 分级依据是 `(pointer: coarse)` 媒体查询，加载时一次性决定，运行期不改 DPR，也不做动态帧率调节；55/30 fps 目标依赖上述预算，掉帧时优先 `setWaterParams({ foamGen: 0, bedOn: false })`、面板阴影设“关”、收起结构高亮。
- 浏览器：Chrome/Edge 90+、Safari 15+、Firefox 90+（需 WebGL 与 Web Audio）。Three r160 优先 WebGL2、缺失时回退 WebGL1；完全无 WebGL 时初始化抛错，由外层 `catch` 显示加载失败信息，不会静默白屏。
- 无 Web Audio：`audioOK=false`，`ShipAudio.init()` 返回 null，声音状态显示“不可用”，三维画面不受影响；无 `StereoPanner` 时声像节点为 null，信号直接进总线（单声道）。

## 11. 部署与首次手势

- 静态托管即可，无需构建：可直接打开 `index.html` 或放到任意静态服务器；建议通过 https 或 localhost 打开（CDN fetch 与 AudioContext 权限更稳定），但必须联网加载 Three.js（3 个 CDN 依次回退，全部失败会显示错误）。
- 自动播放策略：首次 `pointerdown` / `touchstart` / `keydown` 后才创建 AudioContext；声音按钮自己的点击走单独分支，避免首次点击被当成静音切换。

## 12. 参数持久化

| 键 | 内容 | 写入时机 |
| --- | --- | --- |
| `qs-water` | 18 个 `WATER_KEYS` + `weather` | 参数恢复完成后，每次 `applyEnv()` 末尾 |
| `qs-audio` | 8 个声音字段 | `setAudioParams` / `setWeather` |
| `qs-theme` | `dark` / `light` | 切换主题时 |

```js
// qs-water 会在加载恢复后立即回写，须先删除再刷新；读到空值即回到默认海况
['qs-water', 'qs-audio', 'qs-theme'].forEach(k => localStorage.removeItem(k));
location.reload();
```
