import * as commander from 'commander'
import Check from '../utils/check'

// parse id
commander
  .usage('<document-path> [document-path]')
  .parse(process.argv)
const sourcePath: string = `${commander.args[0]}`

;(async() => {
  // check path
  if (!Check.source(sourcePath)) return
  
  
})()

