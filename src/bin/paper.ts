import * as commander from 'commander'
import chalk from 'chalk'
const { version } = require('../../package.json')
const v: string = process.version.match(/\d+/g)[0]
if (+v < 5) {
  console.log(chalk.yellow('require NodeJS 8.x+ version'))
  console.log(chalk.yellow('you need upgrade NodeJS\n'))
  process.exit(1)
}

commander
  .version(version)
  .usage('<command> [options]')
  .command('build', 'generate document')
  .parse(process.argv)

  

