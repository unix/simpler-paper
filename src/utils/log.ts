const chalk = require('chalk')

export default {
  sourceError: (path?: string) => {
    console.log(chalk.red('\nError: the document directory was not found.'))
    path && console.log(chalk.red(`PathError: "${path}".`))
    console.log(`try run [${chalk.green('paper build <docuemnt_path>')}].\n`)
  },
  configInvalid: () => {
    console.log(chalk.red('\nError: paper.config.json is not a valid file.\n'))
  },
}
