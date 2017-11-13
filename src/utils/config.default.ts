
export type Config = {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  docPath: string,
  theme: string,
  highlight: boolean,
  highlightTheme?: string,
  __user_source_path?: string,
}

export type Catalog = {
  fileName: string,
  name: string,
  weight: number,
  children?: Catalog[],
}

export const defaultConfig: Config = {
  alias: {},
  title: 'Simpler Paper',
  docPath: '/',
  theme: 'default',
  minimap: false,
  highlight: true,
  highlightTheme: 'default',
  backToTop: false,
}
