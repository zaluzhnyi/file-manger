import cd from './cd-path.js'
import {unlink} from 'node:fs/promises'

const remove = async (currentPath, pathToFile) => {
    pathToFile = await cd(currentPath, pathToFile)
    if (currentPath !== pathToFile) {
        unlink(pathToFile)
    }
}
export default remove