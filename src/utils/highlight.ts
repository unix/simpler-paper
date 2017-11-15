const USER_PATH = process.cwd()
const __target = `${__dirname}/../../templates/target`
import File from './file'
let includeStyle: boolean = false

export const appendHighlight = async(source: string, scripts: string) => {
  const docPath: string = `${USER_PATH}/${source}`
  const files: string[] = await File.readdir(docPath)
  let hljs: string = ''
  for (const name of files) {
    if (name === 'highlight.js') {
      await File.exec(`cp ${docPath}/${name} ${__target}`)
      hljs += `<script src="./highlight.js"></script>`
    }
    if (name === 'highlight.css') {
      await File.exec(`cp ${docPath}/${name} ${__target}`)
      includeStyle = true
    }
  }
  scripts = hljs + scripts
  
  return scripts
}

export const appendHighlightStyle = (inlineHtml: string): string => {
  if (!includeStyle) return inlineHtml
  return inlineHtml.replace(
    '<!--<link rel="stylesheet" href="./highlight.css">-->',
    '<link rel="stylesheet" href="./highlight.css">',
  )
}
