# QuickStart
Simpler Paper is a very simple and easy to use the document generator.  

you only need to run a command, All of the Markdown will be automatically integrated into the site. 


## Step 1. Init
```bash
# install 
npm install -g simpler-paper  

# init  
paper i
```

## Step 2. Build  
> Don't forget to add some markdown files.  

Example:
```html  

-------------   project dir
|--- build
|--- dist
|--- scripts
|--- docs    ==============     document directory
|    |--- quickstart.md
|    |--- hello.md
|    |--- paper.config.json
...
```

just run: 
```bash  
# build to html
paper build  

# preview  
paper s
```  

## Step 3. Deploy
> In default, the document will be released to github.    

```bash
paper deploy
```

### Other. Set github pages  

  1. go to your rep.
  2. Settings > Options > GitHub Pages  
  3. choose the source for **gh-pages branch**
  
Example:
![example](http://static.wittsay.cc/simpler-papergh-pages.png?imageView2/2/w/850/h/300/)





