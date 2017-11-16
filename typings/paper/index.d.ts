
interface Config {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  docPath: string,
  theme: string,
  output: string,
  indicator: boolean,
  __user_source_path?: string,
}

interface Catalog {
  // file path
  path?: string,
  
  // file native name
  native: string,
  
  // file show name
  name: string,
  
  weight: number,
  
  children?: Catalog[],
}


type PaperRouter = {
  default?: string,
}

type Paper = {
  router: PaperRouter,
}

interface Window {
  __paper?: Paper,
  __config?: Config,
  __catalogs?: Catalog[],
  hljs?: any,
}
