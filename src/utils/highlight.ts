const USER_PATH = process.cwd()
const __target = `${__dirname}/../../templates/target`
import File from './file'

export const findHighlight = async(source: string) => {
  const docPath: string = `${USER_PATH}/${source}`
  const files: string[] = await File.readdir(docPath)
  let scripts: string = ''
  for (const name of files) {
    if (name === 'highlight.js') {
      await File.exec(`cp ${docPath}/${name} ${__target}`)
      scripts += `<script src="./highlight.js"></script>`
    }
    if (name === 'highlight.css') {
      await File.exec(`cp ${docPath}/${name} ${__target}`)
      scripts += `<script>var __link = document.createElement('link');__link.setAttribute('href', './highlight.css');document.head.append(__link)</script>`
    }
  }
  return scripts
}
