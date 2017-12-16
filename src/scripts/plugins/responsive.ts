
export class Responsive {
  
  private trunks: Element[] = []
  private lastSize: string = ''
  
  static TrunksClasses(): string[] {
    return ['.main', '.side-position', '#side', '.container-position', '#container']
  }
  
  static MakeSize(width: number): string {
    if (width < 540) return 'xs'
    if (width < 760) return 'sm'
    if (width < 1300) return 'md'
    if (width < 1920) return 'lg'
    return 'xl'
  }
  
  constructor() {
    this.init()
    this.initMobileEvent()
  }
  
  private init(): void {
    const body: HTMLElement = document.body
    this.trunks = Responsive.TrunksClasses()
      .map(str => body.querySelector(str))
      .filter(r => !!r)
      .concat([body])
    
    window.addEventListener('resize', () => this.detector())
    this.detector()
  }
  
  private detector(): void {
    const size: string = Responsive.MakeSize(window.innerWidth)
    if (size === this.lastSize) return
    try {
      this.trunks.forEach(el => {
        el.classList.add(size)
        this.lastSize && el.classList.remove(this.lastSize)
      })
    } catch (e) {}
    
    this.lastSize = size
  }
  
  private initMobileEvent(): void {
    const sideTitle: Element = document.querySelector('.side-title')
    const sideBar: Element = document.querySelector('#side')
    sideTitle.addEventListener('click', () => {
      const isMobile: boolean = sideBar.classList.contains('xs') || sideBar.classList.contains('sm')
      if (!isMobile) return
      sideBar.classList.toggle('active')
    })
    
  }
  
}

