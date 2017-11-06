import File from './file'
import Log from './log'

export const checkSource = async(path: string = ''): Promise<boolean> => {
  const pass: boolean = await File.exists(path)
  !pass && Log.sourceError(path)
  return pass
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





