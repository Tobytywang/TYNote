# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 Jekyll 的个人博客，使用自定义主题 [jekyll-theme-mammut](https://github.com/Tobytywang/jekyll-theme-mammut)（`release` 分支）。

## 常用命令

```bash
# 安装依赖
bundle install

# 本地预览（http://127.0.0.1:4000）
bundle exec jekyll serve

# 构建网站（输出到 _site/）
bundle exec jekyll build

# 更新主题
bundle update jekyll-theme-mammut
```

## 架构：主题与博客分离

```
jekyll-theme-mammut (主题仓库)     TYNote (博客仓库)
        │                              │
        │ 修改主题样式/布局             │ 撰写文章/配置
        ▼                              ▼
   推送到 release 分支  ──────────▶  bundle update 拉取最新主题
```

**重要**：样式/布局修改在主题仓库进行，文章/配置修改在本仓库进行。

## 主题适配目录

这些目录用于定制主题，会覆盖主题默认配置：

- **`_tabs/`** - 导航标签页，每个文件对应一个页面，通过 `icon` 和 `order` 控制图标和排序
- **`_data/contact.yml`** - 社交联系方式配置（GitHub、邮箱等）
- **`_data/origin/basic.yml`** - 前端库路径配置（字体、tocbot、mermaid、MathJax 等）
- **`_includes/`** - 模板片段，覆盖主题默认模板（`head.html`、`sidebar.html`）

## 写作规范

文章放在 `_posts/`，命名格式：`YYYY-MM-DD-标题.md`

Front Matter 示例：
```yaml
---
title: 文章标题
date: YYYY-MM-DD
categories: [分类]
tags: [标签]
---
```

草稿放在 `_drafts/`，按年份分子目录管理。

## 注意事项

- `_site/` 由 CI 生成，不要提交
- `assets/lib/` 是第三方库，不要修改
- 修改 `.ruby-version` 时需同步更新 `.github/workflows/` 中的 Ruby 版本
