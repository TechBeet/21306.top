# 全面检查重构清理文件规格

## Why
用户请求对 `d:/github/21306.top/ship` 目录进行全面检查、重构与清理，确保最终只保留一个 `index.html` 文件，且结构清晰完整、UI 美观合适、多端适配完整。当前目录下存在 `docs/`、`.screenshots/`、`全部船体规划.md` 等辅助文件，需要评估并清理。

## What Changes
- 清理 `docs/` 目录（`fleet-specs.md`、`water-audio-params.md`），将其内容合并到 `index.html` 的注释或内嵌文档中，或直接删除。
- 清理 `.screenshots/` 目录（临时截图）。
- 清理 `全部船体规划.md`（史料来源文档），将其内容合并到 `index.html` 的注释或内嵌文档中，或直接删除。
- 确保 `index.html` 结构清晰完整，UI 美观合适，多端适配完整。
- 确保 `index.html` 是唯一保留的文件。

## Impact
- 目标文件：`index.html`。
- 删除文件：`docs/fleet-specs.md`、`docs/water-audio-params.md`、`.screenshots/`、`全部船体规划.md`。
- 角色：质量保证与清理规格。

## ADDED Requirements
### Requirement: 文件清理
- **WHEN** 清理目录
- **THEN** 删除 `docs/`、`.screenshots/`、`全部船体规划.md`，确保只保留 `index.html`。

### Requirement: 结构清晰完整
- **WHEN** 检查 `index.html` 结构
- **THEN** 确保 HTML 结构清晰完整，无冗余代码，无未使用的变量或函数。

### Requirement: UI 美观合适
- **WHEN** 检查 UI
- **THEN** 确保 UI 美观合适，符合设计规范，无视觉缺陷。

### Requirement: 多端适配完整
- **WHEN** 检查多端适配
- **THEN** 确保在桌面、平板、手机等不同设备上均能正常显示和交互。

## MODIFIED Requirements
N/A（此为新的清理规格。）

## REMOVED Requirements
N/A