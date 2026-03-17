# yan-skills

前端开发代码风格和规范技能集合，专注于提供高质量的前端工程化最佳实践与规范指南。

## 📖 项目简介

yan-skills 是一个文档驱动的前端工程化知识库，收录了在前端开发（特别是 Vue 3 生态）中的代码规范、工程化配置和最佳实践。旨在帮助开发者：

- ✅ 统一代码风格，减少团队协作中的格式争议
- ✅ 提升代码质量和可维护性
- ✅ 快速搭建符合规范的前端项目
- ✅ 建立标准化的工程化流程

## 🎯 核心内容

### 1. 代码规范 (`skills/yan/skills.md`)

提供完整的前端代码规范指南，包括：

- **代码组织原则**
  - 单一职责：单文件只做一件事
  - 大文件拆分策略
  - 静态映射下沉到 `config.js`

- **注释规范**
  - 避免无意义注释
  - 只解释 why，不解释显而易见的 how

- **Vue 页面模板**
  - 基于 `my-page` 布局的标准页面骨架
  - 开箱即用的 SFC 模板

- **工程化工具链**
  - 包管理器：pnpm
  - 格式化：oxfmt（含完整配置）
  - 代码检查：ESLint Flat Config（含 Vue 3 配置）
  - 自动导入集成方案

### 2. 项目初始化 (`skills/initrepo/skills.md`)

提供从 0 到 1 初始化前端项目的标准流程：

- **三种项目模板**
  - Vue 3 + Vite（默认推荐）
  - Nuxt（SSR/全栈场景）
  - React + Vite

- **完整工程化落地**
  - ESLint + 格式化配置
  - Git Hooks（husky + lint-staged）
  - 提交规范（commitlint）
  - 样式检查（stylelint）

- **推荐目录结构**
  ```
  src/
  ├── api/              # 接口定义
  ├── assets/           # 静态资源
  ├── components/       # 公共组件
  ├── directives/       # 自定义指令
  ├── hooks/            # 组合式函数
  ├── layout/           # 布局组件
  ├── router/           # 路由配置
  ├── store/            # 状态管理
  ├── utils/            # 工具函数
  └── views/            # 页面视图
  ```

- **CLI 中枢架构**（参考 `jg-pmg-centralized-control-web-v2`）
  ```
  cli/
  ├── env/              # 多环境配置
  ├── vite/             # Vite 配置拆分
  ├── workflow/         # 生产工作流
  └── script/           # 辅助脚本
  ```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

## 📦 技术栈

- **文档系统**: Markdown
- **代码格式化**: [oxfmt](https://github.com/oxc-project/oxc) ^0.38.0
- **包管理器**: pnpm
- **模块系统**: CommonJS

## 📋 使用场景

### 适用场景

- ✅ 新建前端项目，需要标准化工程化配置
- ✅ 团队代码规范统一，需要参考最佳实践
- ✅ 学习 Vue 3 项目结构和编码规范
- ✅ 配置 ESLint、格式化工具链
- ✅ 搭建 monorepo 项目架构
- ✅ 发布 npm 包的规范制定

### 不适用场景

- ❌ 需要运行时执行的库或框架
- ❌ 后端相关技术规范
- ❌ 移动端原生开发规范

## 🔧 工具链配置

### oxfmt 配置示例

项目使用 oxfmt 进行代码格式化，核心配置：

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "trailingComma": "none",
  "singleQuote": false,
  "bracketSpacing": true
}
```

### ESLint 配置亮点

- 支持 Vue 3 和 JavaScript
- 集成 `unplugin-auto-import` 的全局变量
- 500 行文件复杂度限制
- 灵活的规则定制（关闭部分严格规则）

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来完善本技能库！

### 添加新技能文档

1. 在 `skills/` 目录下创建新的 `.md` 文件
2. 遵循 Front Matter 格式规范
3. 确保内容经过实践验证

## 📄 License

ISC

## 👨‍💻 作者

- **ryanYan** - 前端工程化实践者

---

**注意**: 本项目是文档驱动的知识库，不包含实际运行时代码。所有规范均来源于实际项目经验，可直接应用于生产环境。
