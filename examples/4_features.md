## Features    


### Multilayer menu  
If you want to create a menu that contains parent-child relationships, you just need to create folders.
simpler-paper automatically generate menus based on hierarchical relationships.  
 
**Example**  

source:
```html
|____docs
| |____install
| | |____install.1.md
| | |____install.2.md
| |____problems
| | |____answer.1.md
| | |____answer.2.md
| |____paper.config.json

```  
target:  

![example1](http://static.wittsay.cc/simpler-paper-examples-1.png?imageView2/2/w/850/h/300/)


### Sort  
Both files and folders support manually specifying weights, you just need to add a prefix to them.  
Prefixes are automatically removed after compilation.  

**Example**  
source:  
```html
|____docs
| |____install
| | |____9_install.1.md
| | |____5_install.2.md
| |____problems
| | |____answer.1.md
| | |____answer.2.md
| |____paper.config.json
```  
target:   
![example2](http://static.wittsay.cc/simpler-paper-examples-2.png?imageView2/2/w/850/h/300/)  


### Code highlighting  
Adding `highlight.js` files and `highlight.css` files will automatically open the code highlighting  
You can download and download these files here: [highlightjs](https://highlightjs.org/download/)

```html
|____docs
| |____paper.config.json
| |____3_theme.md
| |____4_features.md
| |____1_quickstart.md
| |____2_configuration.md
| |____highlight.css
| |____highlight.js

```  







