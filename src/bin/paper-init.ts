import * as inquirer from 'inquirer'
import chalk from 'chalk'
import File from '../utils/file'
import { defaultConfig } from '../utils/config.default'
const __USER_PATH = process.cwd()

const createConfig = async(folder: string) => {
  const configTarget: string = `${__USER_PATH}/${folder}/paper.config.json`
  if (await File.exists(configTarget)) return false
  await File.writeFile(configTarget, JSON.stringify(defaultConfig))
  return true
}

const promps = [{
  type: 'input',
  name: 'folder',
  message: 'Enter a folder name:',
  validate: input => !!input,
}]
const question = [{
  type: 'input',
  name: 'answer',
  message: 'continue: Y / N(default)',
  validate: input => !!input,
}]

;(async() => {
  const { folder } = await inquirer.prompt(promps)
  
  if (/\s+|\\|\/|\^|\|/.test(folder)) {
    console.log(`\n${chalk.yellow(folder)} contains illegal characters.`)
    return process.exit(1)
  }
  
  if (!await File.exists(folder)) {
    await File.exec(`mkdir ${folder}`)
    await createConfig(folder)
    console.log(chalk.green('the configuration file has been created successfully.'))
    return process.exit(0)
  }
  
  console.log(`\nDirectory: ${chalk.yellow(`[${folder}]`)} already existed.`)
  const { answer } = await inquirer.prompt(question)
  const toggle = String(answer).toLowerCase() === 'y'
  if (!toggle) {
    console.log(chalk.yellow('cancelled.'))
    return process.exit(1)
  }
  if (!await createConfig(folder)) {
    console.log(`\n${chalk.yellow(`[${folder}/paper.config.json]`)} already existed.`)
    return process.exit(1)
  }
  console.log(chalk.green('the configuration file has been created successfully.'))
  return process.exit(0)
  
})()
