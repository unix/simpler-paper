import * as inquirer from 'inquirer'
import * as Ora from 'ora'
import chalk from 'chalk'
import File from '../utils/file'

const question = [{
  type: 'input',
  name: 'answer',
  message: 'continue: Y / N (default)',
}]

;(async() => {
  new Ora().info('simpler-paper will be removed!')
  const { answer } = await inquirer.prompt(question)
  const toggle = String(answer).toLowerCase() === 'y'
  if (!toggle) return console.log(chalk.yellow('\ncancelled.'))
  
  File.exec('npm', ['rm', 'simpler-paper', '-g'])
})()
