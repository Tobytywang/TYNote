# TYNote

Tobyty's Personal Blog - 基于 Jekyll 的个人博客

## 项目结构

```
TYNote/
├── _posts/          # 已发布的博客文章（Markdown 格式）
├── _drafts/         # 草稿目录（按年份分目录管理）
├── _config.yml      # Jekyll 配置文件
├── _data/           # 数据文件（联系方式等）
├── _includes/       # 模板片段
├── _tabs/           # 导航标签页
├── assets/          # 静态资源
│   ├── img/         # 图片
│   │   ├── avatar/  # 头像
│   │   ├── favicons/# 网站图标
│   │   └── posts/   # 文章图片
│   └── lib/         # 第三方库（不要修改）
├── .github/         # GitHub 配置
│   └── workflows/   # CI/CD 工作流
├── Gemfile          # Ruby 依赖
└── index.html       # 首页
```

## 技术栈

- **Jekyll** 4.4.1
- **Ruby** 3.4.4
- **主题** jekyll-theme-mammut（自定义 fork）

## 本地开发

### 环境准备

```bash
# 安装 Ruby（使用 rbenv）
brew install rbenv
rbenv install 3.4.4

# 安装依赖
bundle install
```

### 本地预览

```bash
bundle exec jekyll serve
# 访问 http://127.0.0.1:4000
```

### 构建网站

```bash
bundle exec jekyll build
# 输出到 _site/ 目录
```

## 部署流程

1. 推送到 master 分支
2. GitHub Actions 自动触发构建
3. 构建结果部署到 gh-pages 分支
4. 访问 https://blog.tobyty.wang

## 写作指南

### 发布新文章

在 `_posts/` 目录创建文件，命名格式：`YYYY-MM-DD-标题.md`

文件开头需要 Front Matter：

```yaml
---
title: 文章标题
date: YYYY-MM-DD
categories: [分类]
tags: [标签]
---
```

### 管理草稿

草稿存放在 `_drafts/` 目录，按年份分子目录管理。

## 注意事项

- `_site/` 目录由 CI 自动生成，不要提交到 Git
- `assets/lib/` 是第三方库，不要修改
- 修改 `.ruby-version` 时需同步更新 GitHub Actions 配置
