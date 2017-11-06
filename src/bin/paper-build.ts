import * as commander from 'commander'
import { checkSource, checkConfig } from '../utils/check'
import { compileToHtml } from '../compile'
import { defaultConfig, Config } from '../utils/config.default'

// parse id
commander
  .usage('<document-path> [document-path]')
  .parse(process.argv)
const sourcePath: string = `${commander.args[0]}`

;(async() => {
  // check path
  if (!await checkSource(sourcePath)) return
  const config: Config = Object.assign({}, defaultConfig, await checkConfig(sourcePath))
  await compileToHtml(sourcePath, config)
  
})()

