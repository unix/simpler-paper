import { Catalog, Config } from '../../../src/utils/config.default'

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
      li.innerHTML = `<p class="chapter link"><a href="#${link}">${unit.name}</a></p>`
    }
    ul.appendChild(li)
  }
  
  return ul
}

export const side = async(catalogs: Catalog[], config: Config): Promise<HTMLElement> => {
  return await makeList(catalogs, config.__user_source_path, document)
}


const initSubList = async () => {
  const containers: NodeListOf<Element> = document.querySelectorAll('.sub-list-container')
  const subList: NodeListOf<Element> = document.querySelectorAll('.sub-list')
  
  // click directory
  const handle: Function = (event: Event, container: Element): void => {
    const getUlRealHeight: Function = (ul: HTMLElement): number => {
      const children: NodeListOf<Element> = ul.querySelectorAll('li')
      return (Array.from(children).length || 0) * 40
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
  Array.from(subList).forEach(sub => {
    sub.addEventListener('click', (event: Event) => event.stopPropagation())
  })
}

export const event = async(): Promise<void> => {
  await initSubList()
}
