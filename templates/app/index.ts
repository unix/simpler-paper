import { Catalog, Config } from '../../src/utils/config.default'

require('./style')
const config: Config = require('../temp/paper.config.json')
const catalogs: Catalog[] = require('../temp/catalogs.json')
import * as Generator from './scripts/generator'
import { init } from './scripts/utils'
import { Router } from './scripts/router'

const docker: Function = async(w: Window, d: Document): Promise<void> => {
  const side: HTMLElement = d.getElementById('side')
  
  const list: HTMLElement = await Generator.side(catalogs, config)
  side.appendChild(list)
  await Generator.event()
  
  new Router(d.getElementById('container'), config.docPath)
    .listen()
}

window.onload = (): void => {
  init()
  docker(window, document).then()
}


