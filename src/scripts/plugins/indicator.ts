import { EventHub } from '../event'

export class Indicator {
  
  private indicatorElement: HTMLElement
  
  static toggleIndicator(indicatorElement: HTMLElement, show: boolean): void {
    if (!indicatorElement) return
    indicatorElement.classList.toggle('show', show)
  }
  
  constructor(eventHub: EventHub) {
    this.init()
    eventHub.listen('container-will-change', () => this.willChange())
    eventHub.listen('container-changed', () => this.changed())
  }
  
  willChange(): void {
    Indicator.toggleIndicator(this.indicatorElement, true)
  }
  
  changed(): void {
    Indicator.toggleIndicator(this.indicatorElement, false)
  }
  
  private makeIndicatorElement(): HTMLElement {
    const _div: HTMLElement = document.createElement('div')
    _div.classList.add('loading-indicator')
    _div.innerHTML = `<div class="loading-indicator-container"><span>Loading</span></div>`
    return _div
  }
  
  private init(): void {
    const main: HTMLElement = document.querySelector('.main')
    this.indicatorElement = this.makeIndicatorElement()
    main.appendChild(this.indicatorElement)
  }
  
}
