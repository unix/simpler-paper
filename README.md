
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

> A very simple document generator. [preview](https://wittbulter.github.io/simpler-paper/).    
> Quickly build and deploy markdown files with a few commands.

## Guide
- [Feature](#feature)
- [Getting Started](#getting-started)
- [Configuration Details](#configuration-details)
- [Documentation](https://wittbulter.github.io/simpler-paper/)
- [LICENSE](#license)
- [中文](README_CN.md)

### Feature

- Agility. just one script(only ~3kb gzipped), no framework.

- Easy. just one command.

- Lazy load.

- Auto compatible mobile phone.

- More themes. [simpler-paper-themes](https://github.com/DhyanaChina/simpler-paper-themes)


### Getting Started
1. install: `npm i -g simpler-paper`

2. init: `paper init` . to create the doc folder or generate the config file in existing folder.

3. add markdown files in document folder. 🤔🤔

4. build: `paper build` . if you want preview: `paper server` .

5. deploy: `paper deploy` . make sure the current directory of operations is a Git repository.
[Set](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages) to GitHub pages on GitHub after deployment.


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


