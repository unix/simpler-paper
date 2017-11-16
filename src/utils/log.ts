import chalk from 'chalk'
import * as Ora from 'ora'
import { hrtime } from 'process'

let startTime: [number, number]
let ora: any
let oraTask: string

export default {
  sourceError: (path?: string) => {
    console.log(chalk.red('\nError: the document directory was not found.'))
    path && console.log(chalk.red(`PathError: "${path}".`))
    console.log(`try run [${chalk.green('paper build <docuemnt_path>')}].\n`)
  },
  
  configInvalid: () => {
    console.log(chalk.red('\nError: paper.config.json is not a valid file.\n'))
  },
  
  configNonUnique: (directories: string[]) => {
    console.log(chalk.red('\n\nError: There are multiple configuration files:'))
    directories.forEach(dir => console.log(`  ${dir}/paper.config.json`))
    console.log('\nsmipler-paper requires only one configuration file.')
  },
  
  configNotFound: () => {
    console.log(chalk.red(`\nError: not found paper.config.json.\n`))
  },
  
  notFoundTheme: (theme: string) => {
    console.log(chalk.red(`\nError: paper theme [${theme}] is not found.\n`))
  },
  
  time: {
    start(task: string): void {
      startTime = hrtime()
      ora = new Ora(task).start()
      oraTask = task
    },
    over(success: boolean = true): void {
      const time: [number, number] = hrtime(startTime)
      const show: string = (time[1] / 1000000).toFixed(2)
      if (!success) {
        ora.fail(oraTask)
        return process.exit(1)
      }
      ora.succeed(oraTask)
      console.log(`  ${chalk.hex('#44A6BE')(show + ' ms')}\n`)
    },
  },
}
