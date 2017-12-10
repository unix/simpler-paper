## Configuration
Configuration file can help you set up a more detailed document，it is under your document folder,
if you are confused about these configurations, you can skip here~~

### Add paper.config.json
> run `paper init` can quickly create configuration file, if you can't find `paper.config.json`.

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


### All Properties

| key | type | default | description |
| --- | --- | --- | --- |
| alias | `{ [string]: string }` | `{}` | document the alias, the value will be displayed after compilation |
| title | `string` | `'document title'` | simpler paper |
| minimap | `boolean` | `true` | generate mini maps on the right side of each document |
| backToTop | `boolean` | `true` | back to top button |
| indicator | `boolean` | `true` | loading indicator |
| docPath | `string` | `'/'` | document page path |
| theme | `string` | `'default'` | paper theme |
| output | `string` | `'dist'` | compile ouput |



