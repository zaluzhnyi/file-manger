import {access, writeFile} from 'node:fs/promises'
import {constants} from 'node:fs'
import {resolve} from 'node:path'

const add = async (currentPath, fileName) => {
    try {
        if (await access(resolve(currentPath, fileName), constants.F_OK)
            .then(() => true)
            .catch((e) => undefined)) {
            throw new Error(`Operation failed: file exists`)
        } else {
            await writeFile(resolve(currentPath, fileName), '')
        }

    } catch (e) {
        console.log(e.message)
    }
}
export default add