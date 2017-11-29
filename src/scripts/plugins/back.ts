import * as MoveTo from 'moveto'

export class BackToTop {
  
  static toggleBackButton(btnElement: HTMLElement, show: boolean): void {
    btnElement.classList.toggle('show', show)
  }
  
  constructor() {
    this.init()
  }
  
  private makeBackBtn(): HTMLElement {
    const _div: HTMLElement = document.createElement('div')
    _div.classList.add('back-to-top')
    _div.setAttribute('data-mt-duration', '300')
    _div.setAttribute('data-target', '#')
    _div.innerHTML = `<div class="back-to-top-container"><span>Back</span></div>`
    return _div
  }
  
  private init(): void {
    const main: HTMLElement = document.querySelector('.main')
    const backButton: HTMLElement = this.makeBackBtn()
    main.appendChild(backButton)
  
    new MoveTo().registerTrigger(backButton)
    document.addEventListener('scroll', () => {
      BackToTop.toggleBackButton(backButton, document.scrollingElement.scrollTop > 300)
    })
    
  }

}
