
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

> simpler paper, [中文](https://github.com/DhyanaChina/simpler-paper/blob/master/README_CN.md)  
> a very simple document generator. [preview](https://wittbulter.github.io/simpler-paper/)


### Feature

- Agility. just one script(only ~3kb gzipped), no framework.

- Easy. just one command.

- Lazy load.

- Auto compatible mobile phone.

- More themes. [simpler-paper-themes](https://github.com/DhyanaChina/simpler-paper-themes)


### Getting Started
1. install and init:
```bash
# install
npm i -g simpler-paper

# init (create "paper.config.json" in project document directory)
paper init

```

2. usage:
> Don't forget to add some markdown files.

```bash
# build to html
paper build

# preview
paper server
```

3. deploy:
```bash
paper deploy
```


### Documentation
you can create a json file in the document directory.

> run `paper init` can quickly create `paper.config.json`

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

**MIT**


