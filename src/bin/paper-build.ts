import * as commander from 'commander'
import { checkSource, checkConfig, checkTheme } from '../utils/check'
import { compileToHtml, insertToApp, copyTheme } from '../compile'
import { defaultConfig, Config, Catalog } from '../utils/config.default'
import File from '../utils/file'
import Log from '../utils/log'
import { resolve } from 'path'

// parse id
commander
  .usage('<document-path> [document-path]')
  .parse(process.argv)
const sourcePath: string = `${commander.args[0]}`

;(async() => {
  const templateTargetPath = `${__dirname}/../../templates/target`
  const targetPath = `${resolve()}/dist`
  
  // check path
  if (!await checkSource(sourcePath)) return
  const config: Config = Object.assign({},
    defaultConfig,
    await checkConfig(sourcePath),
    { __user_source_path: sourcePath },
  )
  
  const catalogs: Catalog[] = await compileToHtml(sourcePath, config)
  await insertToApp(catalogs, sourcePath, config)
  
  Log.time.start()
  await checkTheme(config)
  await copyTheme(config)
  Log.time.over('generative theme')
  
  Log.time.start()
  if (File.exists(templateTargetPath)) {
    await File.spawnSync('rm', ['-rf', templateTargetPath])
    await File.spawnSync('mkdir', [templateTargetPath])
  }
  await File.spawnSync('./node_modules/.bin/webpack', ['--config', './build/webpack.app.prod.js'])
  Log.time.over('build website')
  
  Log.time.start()
  if (!await File.exists(targetPath)) {
    await File.spawnSync('mkdir', [targetPath])
  }
  // move to user dir
  // await File.spawnSync('mv', ['-f', `${__dirname}/../../templates/target/`, resolve(`${targetPath}/docs`)])
  Log.time.over('clear up')
})()

