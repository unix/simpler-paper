import File from './utils/file'
import { Config, Catalog } from './utils/config.default'
import * as marked from 'marked'


const isMarkFileOrDirectory = (name: string): boolean => {
  return name.endsWith('.md') || !name.includes('.')
}

const generateCatalog = (name: string, config: Config, children: Catalog[] = []) => ({
  fileName: name,
  name: config.alias[name] ? config.alias[name] : name.split('.md')[0],
  children,
})

const generateDirectory = async(path: string, config: Config): Catalog[] => {
  const files: string[] = await File.readdir(path)
  
  let catalogs: Catalog[] = []
  for (let name of files) {
    if (!isMarkFileOrDirectory(name)) continue
    const p: string = `${path}/${name}`
    const stat = await File.stat(p)
    if (stat.isFile()) {
      catalogs.push(generateCatalog(p, config))
      continue
    }
    if (stat.isDirectory()) {
      catalogs.push(generateCatalog(p, config, await generateDirectory(p, config)))
    }
  }
  return catalogs
}

export const compileToHtml = async(path: string, config: Config) => {
  const catalogs: Catalog[] = await generateDirectory(path, config)
  
  console.log(catalogs)
}

