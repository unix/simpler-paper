# Configuration  

## Step 1. add paper.config.json  
> run `paper init` can quickly create `paper.config.json`

Example: 
```html  

-------------   project dir
|--- build
|--- dist
|--- scripts
|--- docs
|    |--- quickstart.md
|    |--- hello.md
|    |--- paper.config.json   (add paper.config.json in doc dir)
...
```
## Step 2. improve the configuration file


```json
{
  // document the alias, the value will be displayed after compilation, default: null
  "alias": {
    "quickstart": "Getting Started"
    //...
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

