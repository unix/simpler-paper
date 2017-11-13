import * as hljs from 'highlight.js'

export class Highlight {
  
  constructor(eventHub: any) {
    eventHub.listen('container-change', this.handle)
  }
  
  handle(): void {
    const blocks: NodeListOf<Element> = document.querySelectorAll('pre')
    Array.from(blocks).forEach(code => {
      hljs.highlightBlock(code)
    })
  }
  
}

