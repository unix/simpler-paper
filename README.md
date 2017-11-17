
<div align="center">
<img src="https://github.com/DhyanaChina/simpler-paper/blob/master/logo.png" align="center">
</div>
<h2>Simpler Paper</h2>

> A very simple document generator. [preview](https://wittbulter.github.io/simpler-paper/)


### Feature

- Agility. just one script(13k, gizp: ~5k), no framework.

- Easy. just one command.

- Lazy load.

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

  // generate mini maps on the right side of each document, default: true
  "minimap": true,

  // back to top button, default: true
  "backToTop": true,

  // document page path, default: "/"
  "docPath": "/",

  // loading indicator, default: true
  "indicator": true
}
```


## LICENSE

**MIT**


