const fs = require('fs')
import * as marked from 'marked'
import * as hljs from 'highlight.js/lib/index.js'
const promisify = require('util.promisify')
const childProcess = require('child_process')


/**
 * tips grammar
 * #>     ====>    info
 * ?>     ====>    warning
 * !>     ====>    error
 */
const renderer = new marked.Renderer()
const tipsReg = /^(?:!|#|\?)&gt;\s+/g
const classMap = { '#': 'info', '?': 'warning', '!': 'error' }
const paragraphCopy: (t: string) => string = renderer.paragraph
renderer.paragraph = (text: string): string => {
  if (!tipsReg.test(text)) return paragraphCopy(text)
  const content: string = text.replace(tipsReg, '')
  const typeStr: string = text.match(tipsReg)[0].replace(/\s/g, '')
  return `<p class="tips ${classMap[typeStr[0]]}">${content}</p>`
}


marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => (<any>hljs).highlightAuto(code).value,
})

const noErrorPromisifyShim: Function = (func: Function) => (...args: any[]) => new Promise(r => {
  func(...args, (...results) => r(...results))
})
const makePromisify: Function = (): Function => {
  const nativePromisify = require('util').promisify
  if (nativePromisify && typeof nativePromisify === 'function') {
    return nativePromisify
  }
  return noErrorPromisifyShim
}
const noErrorPromisify: Function = makePromisify()


export default {
  readdir: promisify(fs.readdir),
  mkdir: promisify(fs.mkdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  exists: noErrorPromisify(fs.exists),
  stat: promisify(fs.stat),
  spawnSync: childProcess.spawnSync,
  exec: promisify(childProcess.exec),
  marked: promisify(marked),
}
