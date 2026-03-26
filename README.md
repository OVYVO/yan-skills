# yan-skills

个人常用前端工程化 skill 仓库，按 Cursor/Agent 可消费的目录结构维护，重点沉淀项目初始化、代码规范和代码审查等高频工作流。

## 项目定位

这个仓库是一个文档驱动的 skill 集合，不提供运行时代码。目标是把常用经验整理成稳定、可复用、可评测的 skill 单元，便于在不同项目中直接复用。

## 仓库结构

```text
skills/
├── codeview/
│   ├── SKILL.md
│   └── evals.json
├── frontend-standards/
│   ├── SKILL.md
│   └── evals.json
└── initrepo/
    ├── SKILL.md
    └── evals.json

docs/
└── conventions.md
```

## 当前 skills

### `frontend-standards`

位置：`skills/frontend-standards/SKILL.md`

定义个人前端工程化偏好与代码规范，包括代码组织、注释策略、Vue 页面模板和工具链约定。

### `initrepo`

位置：`skills/initrepo/SKILL.md`

定义从 0 初始化前端项目的标准流程，覆盖 Vue 3 + Vite、Nuxt、React + Vite 三类模板及工程化落地。

### `codeview`

位置：`skills/codeview/SKILL.md`

定义前端代码审查流程、风险分级方式和输出格式，用于 PR review、问题定位和质量检查。

## 维护约定

- 一个 skill 一个目录，目录名即 skill id
- skill 主文件统一命名为 `SKILL.md`
- `SKILL.md` 中的 front matter `name` 必须与目录名一致
- 每个 skill 的评测文件统一为同目录下的 `evals.json`
- 仓库级约定统一写在 `docs/conventions.md`

## 新增 skill

1. 在 `skills/` 下创建 `skills/<skill-id>/`
2. 新建 `skills/<skill-id>/SKILL.md`
3. 按需补充 `skills/<skill-id>/evals.json`
4. 确保 `name`、目录名、评测中的 `skill_name` 一致

## 本地维护

安装依赖：

```bash
pnpm install
```

格式化：

```bash
pnpm format
```

检查格式：

```bash
pnpm format:check
```

## 参考说明

- 仓库规范见 `docs/conventions.md`
- 格式化配置见 `.oxfmtrc.json`

## License

ISC
