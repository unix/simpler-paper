import * as hljs from 'highlight.js'
import { EventHub } from './event'

export class Highlight {
  
  constructor(eventHub: EventHub) {
    eventHub.listen('container-changed', this.handle)
  }
  
  handle(): void {
    const blocks: NodeListOf<Element> = document.querySelectorAll('pre')
    Array.from(blocks).forEach(code => {
      hljs.highlightBlock(code)
    })
  }
  
}

