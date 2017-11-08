## simpler-paper
A very simple document generator

### Getting Started
1. install:
```bash
npm i -g simpler-paper
```
2. usage:
```bash
# in the project directory run "paper build {dir}"
# ex:
paper build ./docs
```

### Documentation
> you can create a json file in the document directory.
> for example, you document directory is `'./docs'`, and just run: `$ touch ./docs/paper.config.json`.

```typescript
// paper.config.json
{
  // document the alias, the value will be displayed after compilation, default: "null"
  "alias": {
    "quickstart": "Getting Started",
    ...
  },

  // document title, default: "Simpler Paper"
  "title": "Simpler Paper",

  // generate mini maps on the right side of each document, default: "true"
  "minimap": true,

  // back to top button, default: "true"
  "backToTop": true,

  // document page path, default: "/"
  "docPath": "/static/"
}
```


## LICENSE

**MIT**


