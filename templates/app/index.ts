const config: Config = require('../temp/paper.config.json')
const catalogs: Catalog[] = require('../temp/catalogs.json')
import * as Generator from './scripts/generator'
import { init } from './scripts/utils'
import { Router } from './scripts/router'
import { EventHub } from './scripts/event'

const docker: Function = async(w: Window, d: Document): Promise<void> => {
  const eventHub = new EventHub()
  const side: HTMLElement = d.getElementById('side')
  
  const sides: HTMLElement[] = await Generator.side(catalogs, config)
  sides.forEach(element => side.appendChild(element))
  
  await Generator.event(config, eventHub)
  
  new Router(d.getElementById('container'), config.docPath)
    .listen(eventHub)
}

window.onload = (): void => {
  init()
  docker(window, document).then()
}


