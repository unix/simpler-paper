import * as pages from 'gh-pages'
import * as commander from 'commander'
import File from '../utils/file'
import chalk from 'chalk'
import Log from '../utils/log'

commander
  .option('-m, --message', 'server port')
  .parse(process.argv)

const message = commander.args[0] || 'paper update'
;(async() => {
  const __target = `${__dirname}/../../templates/target`
  console.log(`deploy message: ${chalk.green(`${message}`)}`)
  if (!commander.args[0]) {
    console.log(`you can use ${chalk.green('[-m]')} to add information.`)
  }
  
  Log.time.start()
  if (!File.exists(__target)) {
    console.log(chalk.red('Error: not found document.'))
    console.log(chalk.green('you need to run the [paper build] first.'))
    return process.exit(1)
  }
  pages.clean()
  Log.time.over('check, clean.')
  
  Log.time.start()
  pages.publish(__target, {
    message,
    branch: 'gh-pages',
  }, err => {
    if (err) {
      console.log(chalk.red(`Error: ${err}`))
      return process.exit(1)
    }
    Log.time.over('deploy success.')
  })
})()
