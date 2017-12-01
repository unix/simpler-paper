
<p align="center" height="300">
<img src="https://github.com/DhyanaChina/simpler-paper/blob/master/logo.png" align="center">
</p>
<p align=center>
<a target="_blank" href="https://www.npmjs.com/package/simpler-paper" title="NPM version"><img src="https://img.shields.io/npm/v/npm.svg?style=flat-square"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
<a target="_blank" href="https://travis-ci.org/DhyanaChina/simpler-paper" title="Build Status"><img src="https://img.shields.io/travis/DhyanaChina/simpler-paper/master.svg?style=flat-square"></a>
<a target="_blank" href="https://www.npmjs.com/package/simpler-paper" title="Downloads"><img src="https://img.shields.io/npm/dt/simpler-paper.svg?style=flat-square"></a>
</p>

> simpler paper, [English](https://github.com/DhyanaChina/simpler-paper/blob/master/README.md)  
> 一个简单易用的文档生成器. [预览](https://wittbulter.github.io/simpler-paper/)  
> 快速的将众多 markdown 文件生成结构化的网站，并一键部署至 github  

## 目录
- [特点](#特点)
- [准备](#准备)
- [快速上手](#快速上手)
- [语法扩展](#语法扩展)
- [配置文件说明](#配置文件说明)
- [LICENSE](LICENSE)

### 特点

- 敏捷。只有一个脚本(13k, gizp 后大约 5k)，没有任何框架。

- 简单。只需要运行一个命令。

- 懒加载，首屏加载更快。

- 自动适应移动设备。

- 更多的主题。[simpler-paper-themes](https://github.com/DhyanaChina/simpler-paper-themes)

### 准备
使用 simpler-paper ，需要有：
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/)

### 快速上手
1. simpler-paper 安装：
    ```bash
    # 全局安装 simpler-paper
    npm i -g simpler-paper
    ```
1. 初始化，可以创建新文件夹或在已有文件夹生成配置文件：
    ```bash
    # 初始化 (创建文档文件夹与配置文件 "paper.config.json")
    paper init
    ```
1. 添加文档：
    + 不要忘了在文档文件夹中添加你的 markdown 文件。
    + 多层目录的菜单结构是按文档的目录层次决定的，这是不用配置的。
    + 改变文件顺序，比如使某个文件夹或 xxx.md 排列在更前面，只需要在文件或文件夹的名称上加一个数字前缀即可，这些数字代表着权重，就像 CSS 的 z-index 一样写就行：100000_install.md 。
1. 构建：
    ```bash
    # 编译至 html
    paper build
    ```
    构建完成后，可以选择进行本地预览。
    ```bash
    # 本地预览
    paper server
    ```
    根据输出的端口，进行本地的预览，默认端口为 3001 。[http://localhost:3001/](http://localhost:3001/)
1. 部署：
    ```bash
    # 部署至 GitHub
    paper deploy
    ```
    确保当前操作目录为 Git 仓库。部署完成后在 GitHub 上[设置](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages)为 GitHub pages 。

### 语法扩展
- [提示语法](https://wittbulter.github.io/simpler-paper/#/grammar.md)
    - 信息： `#> info message`
    - 警告： `?> warning message`
    - 错误： `!> error message`

### 配置文件说明
配置文件是 `paper init` 过程中指定文档文件夹下的 `paper.config.json`

> 运行 `paper init` 命令可以快速创建配置文件 `paper.config.json`

```typescript
// paper.config.json
{
  // 文档别名, 单个文档对应的别名, 不创建默认使用文件名 默认值: null
  "alias": {
    "quickstart": "Getting Started",
    ...
  },

  // 文档标题, 默认值: "simpler paper"
  "title": "",

  // 在文档右侧生成迷你目录地图, 默认值: true
  "minimap": true,

  // 返回至顶部的按钮, 默认值: true
  "backToTop": true,

  // 文档的路径, 默认值: "/"
  "docPath": "/",

  // 加载指示器, 默认值: true
  "indicator": true
}
```


## LICENSE

**MIT**


