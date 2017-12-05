
<p align="center" height="300">
<img src="https://github.com/DhyanaChina/simpler-paper/blob/master/logo.png" align="center">
</p>

<p align=center>
<a target="_blank" href="https://www.npmjs.com/package/simpler-paper" title="NPM version"><img src="https://img.shields.io/github/package-json/v/DhyanaChina/simpler-paper.svg?style=flat-square"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
<a target="_blank" href="https://travis-ci.org/DhyanaChina/simpler-paper" title="Build Status"><img src="https://img.shields.io/travis/DhyanaChina/simpler-paper/master.svg?style=flat-square"></a>
<a target="_blank" href="https://www.npmjs.com/package/simpler-paper" title="Downloads"><img src="https://img.shields.io/npm/dt/simpler-paper.svg?style=flat-square"></a>
</p>

> Simpler paper, [中文](README_CN.md)  
 A very simple document generator. [preview](https://wittbulter.github.io/simpler-paper/)  
 Quickly build and deploy markdown files with a few commands.

## Guide
- [Feature](#feature)
- [Before](#before)
- [Getting Started](#getting-started)
- [Grammar Extend](#grammar-extend)
- [Configuration Details](#configuration-details)
- [LICENSE](#license)
- [Documentation](https://wittbulter.github.io/simpler-paper/)

### Feature

- Agility. just one script(only ~3kb gzipped), no framework.

- Easy. just one command.

- Lazy load.

- Auto compatible mobile phone.

- More themes. [simpler-paper-themes](https://github.com/DhyanaChina/simpler-paper-themes)

### Before
To use simpler-paper, as the following was required:
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/)

### Getting Started
1. Simpler-paper install:
    ```bash
    # Install simpler-paper
    npm i -g simpler-paper
    ```
1. Init, to create the doc folder or generate the config file in existing folder:
    ```bash
    # Init (create "paper.config.json" in target project doc directory)
    paper init
    ```
1. Add markdown files in document folder.
1. Build:
    ```bash
    # Build to html
    paper build
    ```
    Once built, you can choose to have a local preview
    ```bash
    # Local preview
    paper server
    ```
    The default port for local preview is 3001.[http://localhost:3001/](http://localhost:3001/)  
1. Deploy:
    ```bash
    # Deploy to GitHub
    paper deploy
    ```
    Make sure the current directory of operations is a Git repository. [Set](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages) to GitHub pages on GitHub after deployment.
### Grammar Extend
- [Prompt message](https://wittbulter.github.io/simpler-paper/#/grammar.md)
    - Info: `#> info message`
    - Warning: `?> warning message`
    - Error: `!> error message`
    
### Configuration Details
You can create a `paper.config.json` file in the document directory.

> Run `paper init` can quickly create `paper.config.json`

```typescript
// paper.config.json
{
  // document the alias, the value will be displayed after compilation, default: null
  "alias": {
    "quickstart": "Getting Started",
    ...
  },

  // document title, default: "simpler paper"
  "title": "",

  // back to top button, default: true
  "backToTop": true,

  // document page path, default: "/"
  "docPath": "/",

  // loading indicator, default: true
  "indicator": true
}
```  


### LICENSE

[**MIT**](LICENSE)


