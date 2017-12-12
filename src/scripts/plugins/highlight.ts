import { EventHub } from '../event'

export class Highlight {
  
  constructor(eventHub: EventHub) {
    eventHub.listen('container-changed', this.handle)
  }
  
  handle(): void {
    if (!window.hljs) return
    const { highlightBlock } = window.hljs
    const blocks: NodeListOf<Element> = document.querySelectorAll('pre')
    Array.from(blocks).forEach(code => highlightBlock(code))
  }
  
}

