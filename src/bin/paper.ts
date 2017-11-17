import * as commander from 'commander'
import chalk from 'chalk'
import * as notifier from 'update-notifier'
const pkg = require('../../package.json')

const v: string = process.version.match(/\d+/g)[0]
if (+v < 5) {
  console.log(chalk.yellow('require NodeJS 6+ version.'))
  console.log(chalk.yellow('you need to upgrade the NodeJS.\n'))
  process.exit(1)
}

notifier({ pkg, updateCheckInterval: 1000 * 10 }).notify()

commander
  .version(pkg.version)
  .usage('<command> [options]')
  .command('init', 'init a document folder').alias('i')
  .command('build', 'generate document').alias('bd')
  .command('server', 'lift the document on the local server').alias('s')
  .command('deploy', 'deploy documents in github')
  .command('implode ', 'destroy self')
  .parse(process.argv)

  

