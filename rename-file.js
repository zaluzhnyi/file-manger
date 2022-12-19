import cd from './cd-path.js'
import {rename, access, constants} from 'node:fs/promises'
import {resolve, dirname} from 'node:path'

const renameFile = async (currentPath, pathToFile, fileNameNew) => {
    const pathToOldFile = await cd(currentPath, pathToFile)
    try {
        if (currentPath !== pathToOldFile) {
            const pathToNewFile = resolve(dirname(pathToOldFile), fileNameNew)
            if (await access(pathToNewFile, constants.F_OK)
                .then(() => true)
                .catch((e) => undefined)) {
                throw new Error(`Operation failed: file exists`)
            } else {
                rename(pathToOldFile, pathToNewFile)
            }
        }
    } catch (e) {
        console.log(e.message)
    }

}
export default renameFile