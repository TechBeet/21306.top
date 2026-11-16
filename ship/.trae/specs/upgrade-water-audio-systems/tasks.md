# Tasks

- [x] Task 1: 分层海浪
  - [x] SubTask 1.1: 定义 `WAVE_GROUPS`（涌浪 / 风浪 / 碎浪共 9 分量：振幅、波长、方向、陡度、相位）
  - [x] SubTask 1.2: 顶点着色器改为按组累加，保留解析法线；重力 g 联动
  - [x] SubTask 1.3: 计算雅可比行列式，输出 `vCrest`、`vJ` 与泡沫源强度
  - [x] SubTask 1.4: 海况预设（晴/多云/薄雾/黄昏/风暴）写回各组参数与泡沫强度

- [x] Task 2: 泡沫场（生成/平流/消散）
  - [x] SubTask 2.1: 建立 512²（移动 256²）双缓冲 RT 与全屏 pass
  - [x] SubTask 2.2: 半拉格朗日平流 + 世界坐标滚动
  - [x] SubTask 2.3: 波峰挤压、船体水线足迹、浅滩岸线写入
  - [x] SubTask 2.4: 指数衰减（半衰期可调）
  - [x] SubTask 2.5: 海面着色器采样泡沫纹理，与解析泡沫叠加

- [x] Task 3: 船–浪碰撞浪花
  - [x] SubTask 3.1: 各剖面输出波面高度与船体局部水线高度，求相对垂向速度
  - [x] SubTask 3.2: 粒子池（桌面 900 / 移动 350）与 GPU Points 材质
  - [x] SubTask 3.3: 发射逻辑（阈值、强度、左右舷、随机初速）
  - [x] SubTask 3.4: 重力/阻力/生命周期/透明度衰减，零分配更新

- [x] Task 4: 水体体积与深度
  - [x] SubTask 4.1: 程序化海底高度场（沙洲 + 缓坡）与海床网格/沙材质
  - [x] SubTask 4.2: 海面着色器按水深做 Beer–Lambert 吸收与透明度
  - [x] SubTask 4.3: 浅滩泡沫带；「水面半透」锁定透明度
  - [x] SubTask 4.4: 面板新增「浅滩 / 水深」显示调节

- [x] Task 5: 环境声引擎
  - [x] SubTask 5.1: 音频总线（master → compressor → destination，ambience / sfx 两条）
  - [x] SubTask 5.2: 噪声源与滤波链（褐噪 + 低通/带通 + LFO），随浪高/波周期调制
  - [x] SubTask 5.3: 天气声层（晴/小雨/大雨/薄雾/风暴 + 雷声随机）
  - [x] SubTask 5.4: 天气切换 1.5 s 交叉淡入淡出，避免爆音

- [x] Task 6: 碰撞音效与混响
  - [x] SubTask 6.1: 程序化脉冲响应 + ConvolverNode（湿声/衰减/预延迟可调）
  - [x] SubTask 6.2: 冲击音效（低频撞击 + 高频水花），强度映射音量与音高
  - [x] SubTask 6.3: StereoPannerNode 按撞击点相对相机声像
  - [x] SubTask 6.4: 首次手势启动与静默降级

- [x] Task 7: 参数接口与 UI
  - [x] SubTask 7.1: `window.ShipApp`（水体/声音/海况 get/set）
  - [x] SubTask 7.2: 面板新增「声音」标签页与水体细节滑杆；设置持久化
  - [x] SubTask 7.3: 首次进入的声音开启提示（可点击）

- [x] Task 8: 性能与兼容
  - [x] SubTask 8.1: 粒子/泡沫/阴影/像素比按设备分级
  - [x] SubTask 8.2: 热循环零分配，RT 与几何体复用
  - [x] SubTask 8.3: 无 Web Audio / 无 WebGL2 时静默降级

- [x] Task 9: 文档
  - [x] SubTask 9.1: `docs/water-audio-params.md`：参数表、范围、默认值、性能影响、兼容说明

- [x] Task 10: 回归验证
  - [x] SubTask 10.1: 浏览器实测：五档海况、浅滩、浪花、声音启动/开关、混响
  - [x] SubTask 10.2: 桌面 ≥55 fps、移动 ≥30 fps；控制台无 uncaught error

# Task Dependencies

- Task 2 依赖 Task 1（雅可比与波速）
- Task 3 依赖 Task 2（泡沫足迹）与现有浮力剖面
- Task 4 与 Task 1/2 并行，但 4.2 需 Task 1 的波面高度
- Task 5 独立；Task 6 依赖 Task 5 的总线与 Task 3 的冲击强度
- Task 7 依赖 Task 4/5/6 的参数清单
- Task 8/9/10 在功能完成后执行

# 回归修复记录

- [x] 修复 `chop` 键名冲突（波陡 vs 碎浪组增益），组增益改为 `gSwell/gWind/gChop`
- [x] 修复海底平面写深度导致水面被沙床遮挡（`depthWrite:false`）
- [x] 修复白浪硬边哈希形成的方块色斑（改平滑值噪声）
- [x] 收敛风暴浪高与暖色高光，消除橙色光斑
- [x] 移除调试全局引用
