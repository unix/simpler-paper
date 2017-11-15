import { findHTML } from './utils'

export class Router {
  
  private slotElement: HTMLElement
  private docPath: string
  private links: any[] = []
  private lastLink: HTMLElement
  private eventHub: any
  
  static removeHashTag(hash: string = ''): string {
    if (!hash.startsWith('#')) return hash
    return hash.substr(1, hash.length)
  }
  
  static removeSlash(path: string): string {
    return path.replace(/\/\//g, '/')
  }
  
  static replaceSuffix(name: string): string {
    name = name.split('.md')[0]
    return `${name}.html`
  }
  
  constructor(slotElement: HTMLElement, docPath: string = '/') {
    this.slotElement = slotElement
    this.docPath = docPath
    this.initList()
  }
  
  listen(eventHub: any): void {
    this.eventHub = eventHub
    window.onhashchange = () => this._parseHash()
    this._parseHash()
  }
  
  private initList(): void {
    const sideList: HTMLElement = document.querySelector('.side-list')
    const links: NodeListOf<Element> = sideList.querySelectorAll('a')
    Array.from(links).forEach(link => {
      this.links.push({
        el: link,
        href: link.getAttribute('href'),
      })
    })
  }
  
  private toggleList(hash: string): void {
    const link = this.links.find(link => link.href === `#${hash}`)
    if (!link) return
    this.lastLink && this.lastLink.parentElement.classList.remove('active')
    link.el.parentElement.classList.add('active')
    this.lastLink = link.el
  }
  
  private _parseHash(): void {
    this.eventHub.dispath('container-will-change')
    
    const hash: string = Router.removeHashTag(window.location.hash)
    this.toggleList(hash)
    
    let path: string = '/static/' + this.docPath + hash
    
    // default router path
    if (path.endsWith('/')) {
      path += window.__paper.router.default
    }
    const htmlPath: string = Router.replaceSuffix(path)
    this._loader(Router.removeSlash(htmlPath)).then()
  }
  
  private async _loader(path: string): Promise<void> {
    const res: Response = await findHTML(path)
    const _div: HTMLElement = document.createElement('div')
    _div.classList.add('container-inner')
    _div.innerHTML = await res.text()
    this.slotElement.innerHTML = ''
    this.slotElement.appendChild(_div)
    
    // emit router event
    this.eventHub.dispath('container-changed', path)
  }
}
