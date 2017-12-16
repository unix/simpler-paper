import { findHTML } from './utils'

export class Router {
  
  private slotElement: HTMLElement
  private docPath: string
  private links: any[] = []
  private lastLink: HTMLElement
  private eventHub: any
  private origin: string
  
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
    this.origin = window.location.origin + window.location.pathname
    this.initList()
  }
  
  listen(eventHub: any): void {
    this.eventHub = eventHub
    window.onhashchange = () => this._parseHash()
    this._parseHash()
  }
  
  private closeMenu(): void {
    const sideBar: Element = document.querySelector('#side')
    const isMobile: boolean = sideBar.classList.contains('xs') || sideBar.classList.contains('sm')
    if (!isMobile) return
    sideBar.classList.remove('active')
  }
  
  private initList(): void {
    const sideList: Element = document.querySelector('.side-list')
    const links: NodeListOf<Element> = sideList.querySelectorAll('a')
    Array.from(links).forEach((link: Element) => {
      this.links.push({
        el: link,
        href: link.getAttribute('href'),
      })
    })
  }
  
  private toggleList(hash: string): void {
    const link = this.links.find(link => link.href === `#${decodeURI(hash)}`)
    if (!link) return
    this.lastLink && this.lastLink.parentElement.classList.remove('active')
    link.el.parentElement.classList.add('active')
    this.lastLink = link.el
  }
  
  private _parseHash(): void {
    this.eventHub.dispath('container-will-change')
    const hash: string = Router.removeHashTag(window.location.hash)
    
    // update list style and address link
    this.toggleList(hash)
    
    // default router path
    let path: string = '/static/' + this.docPath + hash
    if (path.endsWith('/')) {
      path += window.__paper.router.default
    }
    const htmlPath: string = Router.replaceSuffix(path)
    this._loader(Router.removeSlash(htmlPath)).then()
  }
  
  private async _loader(path: string): Promise<void> {
    const res: Response = await findHTML(this.origin + path)
    const _div: HTMLElement = document.createElement('div')
    _div.classList.add('container-inner')
    _div.innerHTML = await res.text()
    this.slotElement.innerHTML = ''
    this.slotElement.appendChild(_div)
    this.slotElement.parentElement.scrollTo(0, 0)
    
    // emit router event
    this.eventHub.dispath('container-changed', path)
    // in mobile, close menu side
    this.closeMenu()
  }
  
}
