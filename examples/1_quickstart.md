## QuickStart
Simpler Paper is a very simple and easy to use the document generator.
you only need to run a command, All of the Markdown will be automatically integrated into the site.


### Build and preview    
with just one command, you can easily compile the file and the local preview.
```bash
# install 
npm install -g simpler-paper  

# init  
paper i

# dont forget to add some markdown files.
# build to html
paper build 

# preview  
paper s
```

### Deploy

```bash  
# In default, the document will be released to github.    
paper deploy
```

set github pages:

  1. go to your rep.
  2. Settings > Options > GitHub Pages  
  3. choose the source for **gh-pages branch**
  
the actual effect:     

![example](//static.wittsay.cc/simpler-papergh-pages.png?imageView2/2/w/850/h/300/)





