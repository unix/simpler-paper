const commander = require('commander')
const chalk = require('chalk')
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
  .command('run', 'generate document')
  .parse(process.argv)

  

