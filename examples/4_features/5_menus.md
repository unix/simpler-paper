## Menu


### Multilayer Menus
if you want to create a menu that contains parent-child relationships, you just need to create folders.
simpler-paper automatically generate menus based on hierarchical relationships.
like:

```html
**doc source**
|____docs
| |____install
| | |____install.1.md
| | |____install.2.md
| |____problems
| | |____answer.1.md
| | |____answer.2.md
| |____paper.config.json

```
run `paper bd` and get the following effect:

![example1](assets/example-multilayer-menu.png)

<br/>
<br/>

### Ordering

both files and folders support manually specifying weights, you just need to add a prefix to them.
prefixes are automatically removed after compilation.
like:

```html
**doc source**
|____docs
| |____install
| | |____9_install.1.md
| | |____5_install.2.md
| |____problems
| | |____answer.1.md
| | |____answer.2.md
| |____paper.config.json
```
run `paper bd` and get the following effect:

![example2](assets/example-sort.png)

<br/>
<br/>
