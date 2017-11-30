import * as commander from 'commander'
import * as http from 'http'
import * as serveStatic from 'serve-static'
import File from '../utils/file'
import chalk from 'chalk'

// parse path
commander
  .option('-p, --port', 'server port')
  .parse(process.argv)
const port: number = Number.isNaN(+commander.args[0]) ? 3001 : +commander.args[0]

;(async() => {
  const __target = `${__dirname}/../../templates/target`
  
  if (!File.exists(__target)) {
    console.log(chalk.red('Error: not found document.'))
    console.log(chalk.green('you need to run the [paper build] first.'))
    return process.exit(1)
  }
  
  const server = serveStatic(__target, {
    'index': ['index.html'],
  })
  http.createServer((req, res) => {
    server(req, res)
  }).listen(port)
  
  console.log(`server listening on port: ${chalk.green(`${port}`)}`)
  
})()

