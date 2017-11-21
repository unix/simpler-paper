
interface Config {
  alias: any,
  title: string,
  miniMap: boolean,
  backToTop: boolean,
  docPath: string,
  theme: string,
  output: string,
  indicator: boolean,
  expandAll: boolean,
  __user_source_path?: string,
}

interface Catalog {
  // file path
  path?: string,
  
  // file show path
  showPath: string,
  
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
