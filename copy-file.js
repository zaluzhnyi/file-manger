import cd from './cd-path.js'
import {access, constants} from 'node:fs/promises'
import {resolve, parse} from 'node:path'
import {createReadStream, createWriteStream} from 'node:fs';

const copyFile = async (currentPath, pathToFile, pathNewDirectory) => {
    let pathToNewDir = ''
    const pathToOldDirectory = await cd(currentPath, pathToFile)
    pathNewDirectory = await cd(currentPath, pathNewDirectory)
    try {
        if (currentPath !== pathToOldDirectory && currentPath !== pathNewDirectory) {
            pathToNewDir = resolve(pathNewDirectory, parse(pathToOldDirectory).base)
            if (await access(pathToNewDir, constants.F_OK)
                .then(() => true)
                .catch((e) => undefined)) {
                throw new Error(`Operation failed: file exists`)
            } else {
                const readStream = createReadStream(pathToOldDirectory)
                const writeStream = createWriteStream(pathToNewDir)
                await readStream.pipe(writeStream)
                writeStream.on('finish', () => {
                    return
                })
            }
        }
    } catch (e) {
        console.log(e.message)
    }

}
export default copyFile