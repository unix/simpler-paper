import File from './file'
import Log from './log'

const source: Function = async (path: string = '') => {
  const pass: boolean = await File.exists(path)
  !pass && Log.sourceError(path)
  return pass
}

export default {
  source,
}
