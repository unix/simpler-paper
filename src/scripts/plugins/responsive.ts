
export class Responsive {
  
  private trunks: Element[] = []
  private lastSize: string = ''
  
  static TrunksClasses(): string[] {
    return ['.main', '.side-position', '#side', '.container-position', '#container']
  }
  
  static MakeSize(width: number): string {
    if (width < 600) return 'xs'
    if (width < 960) return 'sm'
    if (width < 1300) return 'md'
    if (width < 1920) return 'lg'
    return 'xl'
  }
  
  constructor() {
    this.init()
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
  
}

