
export class BackToTop {
  
  static toggleBackButton(btnElement: Element, show: boolean): void {
    btnElement.classList.toggle('show', show)
  }
  
  static handleBackButton(container: Element): void {
    container.scrollTop = 0
  }
  
  static makeBackButton(d: Document): Element {
    const _div: Element = d.createElement('div')
    _div.classList.add('back-to-top')
    _div.innerHTML = `<div class="back-to-top-container"><span>Back</span></div>`
    return _div
  }

  constructor() {
    this.init()
  }
  
  private init(): void {
    const container: Element = document.querySelector('#container-position')
    const main: Element = document.querySelector('.main')
    const backButton: Element = BackToTop.makeBackButton(document)
    main.appendChild(backButton)
  
    backButton.addEventListener('click', () => {
      BackToTop.handleBackButton(container)
    })
    container.addEventListener('scroll', (e: Event) => {
      BackToTop.toggleBackButton(backButton, (<Element>e.target).scrollTop > 300)
    })
  }

}
