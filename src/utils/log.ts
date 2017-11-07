import chalk from 'chalk'
import * as Ora from 'ora'
import { hrtime } from 'process'

let startTime: [number, number]

export default {
  sourceError: (path?: string) => {
    console.log(chalk.red('\nError: the document directory was not found.'))
    path && console.log(chalk.red(`PathError: "${path}".`))
    console.log(`try run [${chalk.green('paper build <docuemnt_path>')}].\n`)
  },
  
  configInvalid: () => {
    console.log(chalk.red('\nError: paper.config.json is not a valid file.\n'))
  },
  
  time: {
    start(): void {
      startTime = hrtime()
    },
    over(task: string): void {
      const time: [number, number] = hrtime(startTime)
      const show: string = (time[1] / 1000000).toFixed(2)
      console.log(' ')
      new Ora().start().succeed(`${chalk.hex('#53BD38')(task)} ${chalk.hex('#44A6BE')(show + ' ms')}`)
    },
  },
}
