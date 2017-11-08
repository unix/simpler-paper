import { Catalog, Config } from '../../../src/utils/config.default'

const makeLink = (name: string, path: string): string => {
  return name.replace(path, '')
}

const makeList = async(catalogs: Catalog[], path, d: Document) => {
  const ul: HTMLElement = d.createElement('ul')
  for (const unit of catalogs) {
    const li: HTMLElement = d.createElement('li')
    const link: string = makeLink(unit.fileName, path)
    
    // is directory
    if (unit.children && unit.children.length > 0) {
      li.innerHTML = `<p><a>${unit.name}</a></p>`
      li.appendChild(await makeList(unit.children, path, d))
    } else {
      li.innerHTML = `<p><a href="#${link}">${unit.name}</a></p>`
    }
    ul.appendChild(li)
  }
  
  return ul
}

export const side = async(catalogs: Catalog[], config: Config): Promise<HTMLElement> => {
  const d: Document = document
  const ul: HTMLElement = await makeList(catalogs, config.__user_source_path, d)
  return ul
}
