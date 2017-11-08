import File from './utils/file'
import Log from './utils/log'
import { Config, Catalog } from './utils/config.default'
import * as marked from 'marked'
import { Stats } from 'fs'
const __temp = `${__dirname}/../../templates/temp`
const USER_PATH = process.cwd()


const isMarkFileOrDirectory = (name: string): boolean => {
  return name.endsWith('.md') || !name.includes('.')
}

const makeNameAndWeight = (filePath: string): [string, number] => {
  let weight: number = 100
  let name = filePath.split('.md')[0]
  if (!name.includes('/')) return [name, weight]
  name = name.split('/').reverse()[0]
  
  // the file name contains weights
  // weight style: {num}_{native_file_name}.md
  if (/^\d_/.test(name) && !Number.isNaN(+name[0])) {
    weight = +name[0]
    name = name.replace(/^\d_/, '')
  }
  return [name, weight]
}

const generateCatalog = (filePath: string, config: Config, children: Catalog[] = []) => {
  const [directoryName, weight] = makeNameAndWeight(filePath)
  return {
    fileName: filePath,
    name: config.alias[directoryName] ? config.alias[directoryName] : directoryName,
    children,
    weight,
  }
}

const generateDirectory = async(path: string, config: Config): Promise<Catalog[]> => {
  const files: string[] = await File.readdir(`${USER_PATH}/${path}`)
  const catalogs: Catalog[] = []
  
  for (const name of files) {
    if (!isMarkFileOrDirectory(name)) continue
    const nextPath: string = `${path}/${name}`
    // .replace(/\/.\//g, '/')
      // .replace(/\/\//g,'/')
    const stat: Stats = await File.stat(nextPath)
    if (stat.isFile()) {
      catalogs.push(generateCatalog(nextPath, config))
      continue
    }
    if (stat.isDirectory()) {
      catalogs.push(generateCatalog(nextPath, config, await generateDirectory(nextPath, config)))
    }
  }
  return catalogs.sort((pre, next) => pre.weight - next.weight)
}

export const compileToHtml = async(path: string, config: Config) => {
  Log.time.start()
  const catalogs: Catalog[] = await generateDirectory(path, config)
  Log.time.over('generate catalog')
  return catalogs
}


const copyCatalogsFile = async(catalogs: Catalog[]): Promise<void> => {
  await File.writeFile(`${__temp}/catalogs.json`, JSON.stringify(catalogs))
}

const copyConfigFile = async(config: Config): Promise<void> => {
  await File.writeFile(`${__temp}/paper.config.json`, JSON.stringify(config))
}

const makeTargetPath = (path: string, sourcePath: string): string => {
  const sourceFullPath: string = path.split(sourcePath).reverse()[0]
  return `${__temp}/${sourceFullPath}`
}

const createHtml = async(source: string, target: string): Promise<void> => {
  const content: string = await File.readFile(source, 'utf-8')
  const path: string = target.replace('.md', '.html')
  await File.writeFile(path, marked(content), 'utf-8')
}

const generatePages = async(catalogs: Catalog[], sourcePath: string): Promise<void> => {
  
  for (const unit of catalogs) {
    const p: string = makeTargetPath(unit.fileName, sourcePath)
    if (unit.children && unit.children.length > 0) {
      await File.spawnSync('mkdir', [p])
      await generatePages(unit.children, sourcePath)
      continue
    }
    await createHtml(unit.fileName, p)
  }
}

export const insertToApp = async (catalogs: Catalog[], sourcePath: string, config: Config) => {
  Log.time.start()
  File.spawnSync('rm', ['-rf', __temp])
  Log.time.over('clear cache')
  
  Log.time.start()
  await File.spawnSync('mkdir', [__temp])
  await generatePages(catalogs, sourcePath)
  Log.time.over('compile to html')
  
  Log.time.start()
  await copyConfigFile(config)
  await copyCatalogsFile(catalogs)
  Log.time.over('copy config')
}

