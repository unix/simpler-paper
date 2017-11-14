import * as commander from 'commander'
import { checkSource, checkConfig, checkTheme } from '../utils/check'
import { compileToHtml, insertToApp, copyTheme, copyInlineHtml } from '../compile'
import { defaultConfig } from '../utils/config.default'
import File from '../utils/file'
import Log from '../utils/log'
import { resolve } from 'path'

// parse path
commander
  .usage('<document-path> [document-path]')
  .parse(process.argv)
const sourcePath: string = `${commander.args[0]}`

;(async() => {
  const root = `${__dirname}/../..`
  const templateTargetPath = `${root}/templates/target`
  const templateTempPath = `${root}/templates/temp`
  
  // check path
  if (!await checkSource(sourcePath)) return
  const config: Config = Object.assign({},
    defaultConfig,
    await checkConfig(sourcePath),
    { __user_source_path: sourcePath },
  )
  const targetPath = `${resolve()}/${config.output}`
  const catalogs: Catalog[] = await compileToHtml(sourcePath, config)
  await insertToApp(catalogs, sourcePath, config)
  
  Log.time.start()
  // clear up
  // reset target
  if (File.exists(templateTargetPath)) {
    await File.exec(`rm -rf ${templateTargetPath}`)
    await File.exec(`mkdir ${templateTargetPath}`)
  }
  
  // copy themes to target
  await checkTheme(config)
  await copyTheme(config)
  Log.time.over('generative theme')
  
  
  // copy cache to target, clear cache dir
  if (await File.exists(templateTargetPath)) {
    await File.exec(`rm -rf ${templateTargetPath}`)
  }
  await File.exec(`cp -R ${templateTempPath}/ ${templateTargetPath}`)
  await File.exec(`rm -rf ${templateTempPath}/`)
  
  // copy run time script and make index.html
  await copyInlineHtml(config, catalogs, sourcePath)
  
  
  // output to user dir
  Log.time.start()
  if (await File.exists(targetPath)) {
    await File.exec(`rm -rf ${targetPath}`)
  }
  await File.exec(`cp -R ${templateTargetPath}/ ${targetPath}/`)
  Log.time.over('clear up')
})()

