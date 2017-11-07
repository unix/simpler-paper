
export type Config = {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  nofollow: boolean,
  __user_source_path?: string,
}

export type Catalog = {
  fileName: string,
  name: string,
  children?: Catalog[],
}

export const defaultConfig: Config = {
  alias: {},
  title: 'Simpler Paper',
  minimap: false,
  backToTop: false,
  nofollow: false,
}
