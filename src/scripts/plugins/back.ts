
export class BackToTop {
  
  static toggleBackButton(btnElement: HTMLElement, show: boolean): void {
    btnElement.classList.toggle('show', show)
  }
  
  static handleBackButton(container: HTMLElement): void {
    container.scrollTop = 0
  }

  constructor() {
    this.init()
  }
  
  private makeBackBtn(): HTMLElement {
    const _div: HTMLElement = document.createElement('div')
    _div.classList.add('back-to-top')
    _div.innerHTML = `<div class="back-to-top-container"><span>Back</span></div>`
    return _div
  }
  
  private init(): void {
    const container: HTMLElement = document.querySelector('#container-position')
    const main: HTMLElement = document.querySelector('.main')
    const backButton: HTMLElement = this.makeBackBtn()
    main.appendChild(backButton)
  
    backButton.addEventListener('click', () => {
      BackToTop.handleBackButton(container)
    })
    container.addEventListener('scroll', (e: Event) => {
      BackToTop.toggleBackButton(backButton, (<Element>e.target).scrollTop > 300)
    })
  }

}
