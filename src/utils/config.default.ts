
export type Config = {
  alias: any,
  title: string,
  minimap: boolean,
  backToTop: boolean,
  nofollow: boolean,
  docPath: string,
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
  minimap: false,
  backToTop: false,
  nofollow: false,
}
