import * as commander from 'commander'
import { checkSource, checkConfig, checkTheme } from '../utils/check'
import { compileCatalog, compileMarkdown, copyTheme, copyInlineHtml } from '../compile'
import { defaultConfig } from '../utils/config.default'
import File from '../utils/file'
import Log from '../utils/log'
import { resolve } from 'path'

const removeDir = async(dir) => {
  File.exists(dir) && await File.exec(`rm -rf ${dir}`)
}
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
  if (!await checkSource(sourcePath)) return process.exit(1)
  const config: Config = Object.assign({},
    defaultConfig, await checkConfig(sourcePath), { __user_source_path: sourcePath },
  )
  const targetPath = `${resolve()}/${config.output}`
  const catalogs: Catalog[] = await compileCatalog(config)
  await compileMarkdown(catalogs, sourcePath)
  
  Log.time.start()
  // reset target dir
  await removeDir(templateTargetPath)
  await File.exec(`mkdir ${templateTargetPath}`)
  
  // copy themes to target
  await checkTheme(config)
  await copyTheme(config)
  Log.time.over('generative theme')
  
  
  // copy cache to target, clear cache dir
  await File.exec(`cp -R ${templateTempPath}/ ${templateTargetPath}`)
  await removeDir(templateTempPath)
  
  // copy run time script and make index.html
  await copyInlineHtml(config, catalogs)
  
  
  // output to user dir
  Log.time.start()
  await removeDir(targetPath)
  await File.exec(`cp -R ${templateTargetPath}/ ${targetPath}/`)
  Log.time.over('clear up')
})()

