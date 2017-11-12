import { Catalog, Config } from '../../../src/utils/config.default'
import { BackToTop } from './backToTop'

const saveToDefaultRouter = (link: string) => {
  if (window.__paper.router.default) return
  window.__paper.router.default = link
}

const makeLink = (name: string, path: string): string => name.replace(path, '')

const makeList = async(catalogs: Catalog[], path, d: Document) => {
  const ul: HTMLElement = d.createElement('ul')
  for (const unit of catalogs) {
    const li: HTMLElement = d.createElement('li')
    const link: string = makeLink(unit.fileName, path)
    
    // is directory
    if (unit.children && unit.children.length > 0) {
      li.innerHTML = `<p class="chapter dir"><a>${unit.name}</a></p>`
      li.classList.add('sub-list-container')
      const subList: HTMLElement = await makeList(unit.children, path, d)
      subList.classList.add('sub-list')
      li.appendChild(subList)
    } else {
      // is link
      // first link
      saveToDefaultRouter(link)
      li.innerHTML = `<p class="chapter link"><a href="#${link}">${unit.name}</a></p>`
    }
    ul.appendChild(li)
  }
  
  return ul
}

const makeTitle = (config: Config): HTMLElement => {
  const title: HTMLElement = document.createElement('div')
  title.classList.add('side-title')
  title.innerHTML = `<h2>${config.title}</h2>`
  return title
}

export const side = async(catalogs: Catalog[], config: Config): Promise<HTMLElement[]> => {
  const title: HTMLElement = makeTitle(config)
  const list: HTMLElement = await makeList(catalogs, config.__user_source_path, document)
  list.classList.add('side-list')
  return [title, list]
}


const initSubList = async () => {
  const containers: NodeListOf<Element> = document.querySelectorAll('.sub-list-container')
  const subList: NodeListOf<Element> = document.querySelectorAll('.sub-list')
  const subListArr: Element[] = Array.from(subList)
  let baseHeight: number = 37
  subListArr.some(sub => {
    const li: HTMLElement = sub.querySelector('li')
    if (li && li.offsetHeight) {
      baseHeight = li.offsetHeight
    }
    return !!li
  })
  
  // click directory
  const handle: Function = (event: Event, container: Element): void => {
    const getUlRealHeight: Function = (ul: HTMLElement): number => {
      const children: NodeListOf<Element> = ul.querySelectorAll('li')
      return (Array.from(children).length || 0) * baseHeight
    }
    const list: HTMLElement = container.querySelector('.sub-list')
    const height: number = getUlRealHeight(list)
    const isClose: boolean = list.offsetHeight > 0
    
    // is deep directory
    let deep: number = 3
    const syncParentsHeight: Function = (self: HTMLElement): any => {
      if (deep <= 0) return
      deep --
      
      const parent: HTMLElement = self.parentElement
      const isList: boolean = parent.nodeName.toLowerCase() === 'ul'
      const isSubList: boolean = parent.classList.contains('sub-list')
      if (!isList || !isSubList) return syncParentsHeight(self.parentElement)
      
      const nativeHeight: number = getUlRealHeight(parent)
      parent.style.height = `${isClose ? nativeHeight : nativeHeight + height}px`
      deep ++
      syncParentsHeight(self.parentElement)
    }
    syncParentsHeight(list)
    
    list.style.height = `${isClose ? 0 : height}px`
  }
  Array.from(containers).forEach(con => {
    con.addEventListener('click', (event: Event) => handle(event, con))
  })
  subListArr.forEach(sub => {
    sub.addEventListener('click', (event: Event) => event.stopPropagation())
  })
}

export const event = async(config: Config): Promise<void> => {
  await initSubList()
  if (config.backToTop) {
    new BackToTop()
  }
  
}
