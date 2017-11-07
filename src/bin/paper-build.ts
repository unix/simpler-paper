import * as commander from 'commander'
import { checkSource, checkConfig } from '../utils/check'
import { compileToHtml, insertToApp } from '../compile'
import { defaultConfig, Config, Catalog } from '../utils/config.default'

// parse id
commander
  .usage('<document-path> [document-path]')
  .parse(process.argv)
const sourcePath: string = `${commander.args[0]}`

;(async() => {
  // check path
  
  if (!await checkSource(sourcePath)) return
  const config: Config = Object.assign({}, defaultConfig, await checkConfig(sourcePath))
  
  const catalogs: Catalog[] = await compileToHtml(sourcePath, config)
  await insertToApp(catalogs, sourcePath, config)
  
})()

