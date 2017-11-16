import { defaultConfig } from './config.default'
import File from './file'
import Log from './log'
import { Stats } from 'fs'

export const checkSource = async(path: string = '') => {
  if (!await File.exists(path)) {
    Log.sourceError(path)
    process.exit(1)
  }
}

export const checkConfig = async(path: string = ''): Promise<any> => {
  const configPath: string = `${path}/paper.config.json`
  if (!await File.exists(configPath)) return {}
  const config: Buffer = await File.readFile(`${path}/paper.config.json`)
  
  let result: any
  try {
    result = JSON.parse(config.toString() || '{}')
  } catch (e) {
    Log.configInvalid()
  }
  return result
}

export const checkTheme = async(config: Config): Promise<boolean> => {
  const theme: string = config.theme || 'default'
  const p: string = `${__dirname}/../../node_modules/simpler-paper-themes/dist/${theme}.css`
  if (!await File.exists(p)) {
    Log.notFoundTheme(theme)
    process.exit(1)
    return false
  }
  return true
}

export const findSource = async(userPath: string): Promise<string> => {
  const files: string[] = await File.readdir(userPath)
  const directories: string[] = []
  for (const f of files) {
    const stat: Stats = await File.stat(`${userPath}/${f}`)
    if (stat.isFile()) continue
    if (await File.exists(`${userPath}/${f}/paper.config.json`)) {
      directories.push(f)
    }
  }
  if (directories.length > 1) {
    Log.configNonUnique(directories)
    process.exit(1)
  }
  if (directories.length === 0) {
    Log.configNotFound()
    process.exit(1)
  }
  return directories[0]
}

export const assignConfig = async(source: string): Promise<Config> => {
  await checkSource(source)
  const userConfig: any = await checkConfig(source)
  const config: Config = Object.assign({},
    defaultConfig,
    userConfig,
    { __user_source_path: source },
  )
  return config
}
