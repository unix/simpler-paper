const chalk = require('chalk')

export default {
  sourceError: (path?: string) => {
    console.log(chalk.red(`\nError: the document directory was not found.`))
    path && console.log(chalk.red(`PathError: "${path}".`))
    console.log(chalk.green('try run [paper go -p {docuemnt_path}].\n'))
  },
}
