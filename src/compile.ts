import { resolve } from 'path'
import File from './utils/file'
import { Config, Catalog } from './utils/config.default'
import * as marked from 'marked'
const __temp = `${resolve()}/templates/temp/`


const isMarkFileOrDirectory = (name: string): boolean => {
  return name.endsWith('.md') || !name.includes('.')
}

const makeDirectoryName = (name: string): string => {
  name = name.split('.md')[0]
  if (!name.includes('/')) return name
  return name.split('/').reverse()[0]
}

const generateCatalog = (name: string, config: Config, children: Catalog[] = []) => {
  const directoryName: string = makeDirectoryName(name)
  return {
    fileName: name,
    name: config.alias[directoryName] ? config.alias[directoryName] : directoryName,
    children,
  }
}

const generateDirectory = async(path: string, config: Config): Promise<Catalog[]> => {
  const files: string[] = await File.readdir(path)
  
  const catalogs: Catalog[] = []
  for (const name of files) {
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
  return catalogs
}

const copyCatalogsFile = async(catalogs: Catalog[]): Promise<void> => {
  await File.writeFile(`${__temp}/catalogs.json`, JSON.stringify(catalogs))
}

const copyConfigFile = async(config: Config): Promise<void> => {
  await File.writeFile(`${__temp}/paper.config.json`, JSON.stringify(config))
}

const makeTargetPath = (path: string, sourcePath: string): string => {
  return path.replace(sourcePath, __temp)
}

const createDirectory = async(targetPath: string): Promise<void> => {
  if (!await File.exists(targetPath)) {
    await File.mkdir(targetPath)
  }
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
      await createDirectory(p)
      await generatePages(unit.children, sourcePath)
      continue
    }
    await createHtml(unit.fileName, p)
  }
}

export const insertToApp = async (catalogs: Catalog[], sourcePath: string, config: Config) => {
  File.spawnSync('rm', ['-rf', __temp])
  await File.mkdir(__temp)
  await generatePages(catalogs, sourcePath)
  await copyConfigFile(config)
  await copyCatalogsFile(catalogs)
}

