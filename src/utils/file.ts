const fs = require('fs')
const promisify = require('util.promisify')
const childProcess = require('child_process')


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
}
