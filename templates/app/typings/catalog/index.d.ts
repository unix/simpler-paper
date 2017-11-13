
interface Config {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  docPath: string,
  theme: string,
  highlight: boolean,
  highlightTheme?: string,
  indicator: true,
  __user_source_path?: string,
}

interface Catalog {
  fileName: string,
  name: string,
  weight: number,
  children?: Catalog[],
}

