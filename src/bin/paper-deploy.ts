import * as pages from 'gh-pages'
import * as commander from 'commander'
import File from '../utils/file'
import Log from '../utils/log'
import { findSource, assignConfig } from '../utils/check'
import chalk from 'chalk'

const resetDir = async(path: string) => {
  await File.exists(path) && await File.exec(`rm -rf ${path}`)
}

const checkGit = async(git: string) => {
  if (await File.exists(git)) return
  console.log(chalk.red('Error: not in the GIT workspace.'))
  process.exit(1)
}

commander
  .option('-m, --message', 'server port')
  .parse(process.argv)

const message = commander.args[0] || 'paper update'
;(async() => {
  const __user = process.cwd()
  const cachePath = `${__user}/.paper.deploy.cache`
  await checkGit(`${__user}/.git`)
  
  console.log(`deploy message: ${chalk.green(`${message}`)}`)
  if (!commander.args[0]) {
    console.log(`you can use ${chalk.green('[-m]')} to add information.\n`)
  }
  
  Log.time.start('check config')
  const source: string = await findSource(__user)
  const config: Config = await assignConfig(source)
  const distPath: string = `${__user}/${config.output}`

  if (!await File.exists(distPath) || !await File.exists(`${distPath}/index.html`)) {
    console.log(chalk.red('\nError: not found document.'))
    console.log(chalk.green('you need to run the [paper build] first.'))
    return Log.time.over(false)
  }
  pages.clean()
  Log.time.over()
  
  Log.time.start('deploy to github')
  await resetDir(cachePath)
  pages.publish(distPath, {
    message,
    branch: 'gh-pages',
    cache: cachePath,
  }, err => {
    resetDir(cachePath).then()
    if (err) {
      console.log(chalk.red(`Error: ${err}`))
    }
    Log.time.over(!err)
  })
  
  
})()
