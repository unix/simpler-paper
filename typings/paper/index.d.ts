
interface Config {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  docPath: string,
  theme: string,
  output: string,
  indicator: true,
  __user_source_path?: string,
}

interface Catalog {
  fileName: string,
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
