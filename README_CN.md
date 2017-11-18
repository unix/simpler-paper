
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


### 特点

- 敏捷。只有一个脚本(13k, gizp 后大约 5k)，没有任何框架。

- 简单。只需要运行一个命令。

- 懒加载，首屏加载更快。

- 自动适应移动设备。

- 更多的主题。[simpler-paper-themes](https://github.com/DhyanaChina/simpler-paper-themes)


### 快速上手
1. 下载和初始化:
```bash
# 安装
npm i -g simpler-paper

# 初始化 (创建文档文件夹与配置文件 "paper.config.json")
paper init

```

2. 使用:
> 不要忘了在文档文件夹中添加你的 markdown 文件。

```bash
# 编译至 html
paper build

# 本地预览
paper server
```

3. 部署:
```bash
paper deploy
```


### 文档
配置文件是文档文件夹下的 `paper.config.json`

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


