import File from './utils/file'
import * as marked from 'marked'

export const compileToHtml: Function = async(path: string, config: any) => {
  const files: string[] = await File.readdir(path)
  
  
  
}

