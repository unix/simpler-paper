import { findHTML } from './utils'

export class Router {
  
  private slotElement: HTMLElement
  private docPath: string
  
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
  }
  
  listen(): void {
    window.onhashchange = () => this._parseHash()
    this._parseHash()
  }
  
  private _parseHash(): void {
    const hash: string = Router.removeHashTag(window.location.hash)
    let path: string = this.docPath + hash
    
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
    _div.innerHTML = await res.text()
    this.slotElement.innerHTML = ''
    this.slotElement.appendChild(_div)
  }
}
