import File from './utils/file'
import Log from './utils/log'
import * as marked from 'marked'
import { Stats } from 'fs'
import { appendHighlight, appendHighlightStyle } from './utils/highlight'

export const pathFormat = path => path.replace(/\\/g, '/')
const __app = pathFormat(`${__dirname}/../../templates/app`)
const __target = pathFormat(`${__dirname}/../../templates/target`)
const __temp = pathFormat(`${__dirname}/../../templates/temp`)
const USER_PATH = process.cwd()


const parseSuffix = (filePath: string): [string, string, string, string, number] => {
  const suffix: string = filePath.split('/').reverse()[0]
  // suffix: {number}_{filename}.md
  const includeNumberPrefix = /^\d+_/.test(suffix) && !Number.isNaN(+suffix.split('_')[0])
  const weight = includeNumberPrefix ? +suffix.split('_')[0] : 100
  const fileName = includeNumberPrefix ? suffix.replace(/^\d+_/, '') : suffix
  const path = filePath.replace(suffix, '')
  
  const showPath = path.replace(/\d+_/g, '')
  
  return [path, showPath, suffix, fileName, weight]
}

const generateCatalog = (filePath: string, config: Config, children: Catalog[] = []) => {
  const [path, showPath, suffix, fileName, weight] = parseSuffix(filePath)
  return {
    path, showPath, native: suffix,
    name: config.alias[fileName] ? config.alias[fileName] : fileName,
    children,
    weight,
  }
}

const isMarkFileOrDirectory = (name: string): boolean => name.endsWith('.md') || !name.includes('.')

const deepEachSource = async(path: string, config: Config): Promise<Catalog[]> => {
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
      catalogs.push(generateCatalog(nextPath, config, await deepEachSource(nextPath, config)))
    }
  }
  return catalogs.sort((pre, next) => pre.weight - next.weight)
}

export const compileCatalog = async(config: Config) => {
  Log.time.start('generate catalog')
  const catalogs: Catalog[] = await deepEachSource(config.__user_source_path, config)
  Log.time.over()
  return catalogs
}


const makeTargetPath = (path: string, sourcePath: string): string => {
  const sourceFullPath: string = path.split(sourcePath).reverse()[0]
  return `${__temp}/static/${sourceFullPath}`
}

// the markdown is converted to HTML
const createHtml = async(source: string, target: string): Promise<void> => {
  const content: string = await File.readFile(source, 'utf-8')
  target = target.replace('.md', '.html')
  await File.writeFile(target, marked(content), 'utf-8')
}

const generatePages = async(catalogs: Catalog[], sourcePath: string): Promise<void> => {
  for (const unit of catalogs) {
    const p: string = makeTargetPath(unit.showPath + unit.name, sourcePath)
    if (unit.children && unit.children.length > 0) {
      await File.spawnSync('mkdir', [p])
      await generatePages(unit.children, sourcePath)
      continue
    }
    await createHtml(unit.path + unit.native, p)
  }
}

export const compileMarkdown = async(catalogs: Catalog[], sourcePath: string) => {
  Log.time.start('compile to html')
  File.spawnSync('rm', ['-rf', __temp])

    await File.mkdir(__temp)
  // await File.exec(`mkdir ${__temp}/static/`)
  //   const staticPath = __temp + '/static'
    await File.mkdir(`${__temp}/static`)
  await generatePages(catalogs, sourcePath)
  Log.time.over()
}

export const copyTheme = async(config: Config): Promise<void> => {
  const theme: string = config.theme || 'default'
  const p: string = `${__dirname}/../../node_modules/simpler-paper-themes/dist/${theme}.css`
  const themeStr: string = await File.readFile(p, 'utf-8')
  await File.writeFile(`${__temp}/index.css`, themeStr)
}

export const copyInlineHtml = async(config: Config, catalogs: Catalog[]): Promise<void> => {
  const index: string = await File.readFile(`${__app}/index.html`, 'utf-8')
  const indexs: string[] = index.split('</body>')
  let scripts: string = `
    <script>window.__config=${JSON.stringify(config)};window.__catalogs=${JSON.stringify(catalogs)}</script>
    <script src="./index.js"></script>`
  const foot = `</body>${indexs.pop()}`
  await File.exec(`cp ${__dirname}/../index.js ${__target}/index.js`)
  scripts = await appendHighlight(config.__user_source_path, scripts)

  let inlineHtml: string = indexs.reduce((pre, next) => pre + next, '') + scripts + foot
  inlineHtml = inlineHtml.replace('__TITLE__', config.title)
  inlineHtml = appendHighlightStyle(inlineHtml)
  inlineHtml = inlineHtml.replace(/\n/g, '').replace(/>\s+</g, '><')
  await File.writeFile(`${__target}/index.html`, inlineHtml, 'utf-8')
}
