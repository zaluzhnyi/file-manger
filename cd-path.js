import {isAbsolute, resolve} from 'node:path'
import {access} from 'node:fs/promises'
import {constants} from 'node:fs'

const cd = async (currentPath, path) => {
    if (isAbsolute(path)) {
        try {
            await access(path, constants.F_OK).catch((e) => {
                throw new Error(`Operation failed: ${e.message}`)
            })
            return path
        } catch (e) {
            console.log(e.message)
            return currentPath
        }

    } else {
        try {
            path = resolve(currentPath, path)
            await access(path, constants.F_OK).catch((e) => {
                throw new Error(`Operation failed: ${e.message}`)
            })
            return path
        } catch (e) {
            console.log(e.message)
            return currentPath
        }

    }
}
export default cd