import { Catalog, Config } from '../../src/utils/config.default'

const config: Config = require('../temp/paper.config.json')
const catalogs: Catalog[] = require('../temp/catalogs.json')
import * as Generator from './scripts/generator'

const docker: Function = async(w: Window, d: Document): Promise<void> => {
  const side: HTMLElement = d.getElementById('side')
  
  const list: HTMLElement = await Generator.side(catalogs, config)
  side.appendChild(list)
}

window.onload = (): void => {
  docker(window, document).then()
}


