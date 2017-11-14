import * as commander from 'commander'
import * as express from 'express'
import * as serveStatic from 'serve-static'

// parse path
commander
  .option('-p, --port', 'server port')
  .parse(process.argv)
const port: number = Number.isNaN(+commander.args[0]) ? 3001 : +commander.args[0]

;(async() => {
  const root = `${__dirname}/../..`

  const app = express()
  app.use(serveStatic(`${root}/templates/target`, {
    'index': ['index.html'],
  }))
  
  // Listen
  app.listen(port)
  
})()

