# Skill Repository Conventions

## 目标

本仓库用于维护个人常用的前端工程化 skills。目录结构、命名和元数据需要保持稳定，便于长期维护、检索和自动化处理。

## 目录结构

```text
skills/
  <skill-id>/
    SKILL.md
    evals.json
```

约定如下：

- `skills/` 只存放正式 skill
- 每个 skill 一个独立目录
- skill 主文件固定为 `SKILL.md`
- 评测文件固定为 `evals.json`

## 命名规范

### skill id

- 目录名即 skill id
- 使用小写字母、数字和连字符
- 不使用空格、下划线和驼峰

示例：

- `frontend-standards`
- `initrepo`
- `codeview`
- `project-init`

### front matter

`SKILL.md` 必须包含 YAML front matter，最少包含以下字段：

```yaml
---
name: project-init
description: Initialize frontend projects and apply engineering defaults. Use when creating a new project, bootstrapping a Vite or Nuxt app, or setting up lint and format workflows.
metadata:
  author: ryanYan
  version: "2026.03.26"
---
```

约定如下：

- `name` 必须与目录名一致
- `description` 需要同时说明做什么、何时触发
- `metadata.author` 统一填写 `ryanYan`
- `metadata.version` 使用日期或日期版号

## 内容编写建议

- `SKILL.md` 优先写核心规则，避免堆砌背景介绍
- 若细节很多，优先拆到同目录下的辅助文档，再从 `SKILL.md` 链接
- 尽量控制 `SKILL.md` 在 500 行以内
- 用统一术语描述同一件事，避免同义词混用

## 评测文件格式

`evals.json` 建议使用以下结构：

```json
{
  "skill_name": "project-init",
  "evals": [
    {
      "id": 1,
      "prompt": "用户输入",
      "expected_output": "期望输出摘要",
      "files": []
    }
  ]
}
```

约定如下：

- `skill_name` 必须与目录名和 `name` 一致
- `id` 在单个 skill 内唯一
- `expected_output` 描述关键验收点，不写过长自然语言

## 新增 skill 清单

1. 创建 `skills/<skill-id>/`
2. 新建 `skills/<skill-id>/SKILL.md`
3. 填写 front matter，确保 `name` 与目录名一致
4. 按需补充 `skills/<skill-id>/evals.json`
5. 更新 `README.md` 中的技能列表
