const config: Config = window.__config
const catalogs: Catalog[] = window.__catalogs
import * as Generator from './generator'
import { init } from './utils'
import { Router } from './router'
import { EventHub } from './event'

const docker: Function = async(w: Window, d: Document): Promise<void> => {
  const eventHub = new EventHub()
  const sidebar: HTMLElement = d.getElementById('side')
  
  const sides: HTMLElement[] = await Generator.side(catalogs, config)
  sides.forEach(el => sidebar.appendChild(el))
  
  await Generator.event(config, eventHub)
  
  new Router(d.getElementById('container'), config.docPath)
    .listen(eventHub)
}

window.onload = (): void => {
  init()
  docker(window, document).then()
}


