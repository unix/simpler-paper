# QuickStart
Simpler Paper is a very simple and easy to use the document generator.  

you only need to run a command, All of the Markdown will be automatically integrated into the site. 


## Step 1. Install
run `npm install -g simpler-paper`  


## Step 2. Build  
just run: 
```bash  
# in the project directory run "paper build {dir}"
# ex:
paper build ./docs

# alias:
paper bd ./docs
```  

## Step 3. Preview  
If you want to see the document page immediately, run:  
```bash
paper server  

# alias:
paper s
```  

## Step 4. Deploy
> In default, the document will be released to github.    

```bash
paper deploy
```
  
## Step 5. Set github pages  

  1. go to your rep.
  2. Settings > Options > GitHub Pages  
  3. choose the source for **gh-pages branch**
  
Example:
![example](http://static.wittsay.cc/simpler-papergh-pages.png?imageView2/2/w/850/h/300/)





