import * as process from 'node:process'
import * as readline from 'node:readline/promises';
import * as os from 'node:os'
import list from "./ls.js";
import up from "./up-path.js"
import cd from "./cd-path.js"
import read from "./read-file.js"
import add from "./add-file.js"
import renameFile from "./rename-file.js";
import copyFile from "./copy-file.js";
import remove from "./remove-file.js";

const currrentlyPathText = 'You are currently in '
const userName = process.argv.slice(-1)[0].replace(/.+=/, "")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let path = os.homedir()
let command = ''
console.log(`Welcome to the File Manager, ${userName}!\n`)
console.log(currrentlyPathText + path)
rl.on('line', async (line) => {
    command = line.trim().replace(/(\s.+)/, "")
    switch (command) {
        case ('up'): {
            path = await up(path)
            console.log(currrentlyPathText + path)
            break
        }
        case ('cd'): {
            const rg = new RegExp('(\\s.+)', 'g')
            let newPath = line.trim().match(rg)[0].trim()
            path = await cd(path, newPath)
            console.log(currrentlyPathText + path)
            break
        }
        case ('ls'): {
            await list(path)
            console.log(currrentlyPathText + path)
            break
        }
        case ('cat'): {
            const rg = new RegExp('(\\s.+)', 'g')
            let newPath = line.trim().match(rg)[0].trim()
            await read(path, newPath).then(() => console.log(currrentlyPathText + path))
            break
        }
        case ('add'): {
            const rg = new RegExp('(?<=\")(.+?)(?=\")', 'g')
            const rg2 = new RegExp('(\\s.+)', 'g')
            let fileName = line.trim().match(rg) ? line.trim().match(rg)[0].trim() : line.trim().match(rg2)[0].trim()
            await add(path, fileName)
            console.log(currrentlyPathText + path)
            break
        }
        case ('rn'): {
            const rg = new RegExp('(?<=\")(.+?)(?=\")', 'g')
            const paths = line.trim().match(rg)
            paths.splice(1, 1)
            await renameFile(path, paths[0], paths[1])
            console.log(currrentlyPathText + path)
            break
        }
        case ('cp'): {
            const rg = new RegExp('(?<=\")(.+?)(?=\")', 'g')
            const paths = line.trim().match(rg)
            paths.splice(1, 1)
            await copyFile(path, paths[0], paths[1])
            console.log(currrentlyPathText + path)
            break
        }
        case ('rm'): {
            const rg = new RegExp('(?<=\")(.+?)(?=\")', 'g')
            const rg2 = new RegExp('(\\s.+)', 'g')
            let pathToFile = line.trim().match(rg) ? line.trim().match(rg)[0].trim() : line.trim().match(rg2)[0].trim()
            await remove(path, pathToFile)
            console.log(currrentlyPathText + path)
            break
        }
        case ('mv'): {
            const rg = new RegExp('(?<=\")(.+?)(?=\")', 'g')
            const paths = line.trim().match(rg)
            paths.splice(1, 1)
            await copyFile(path, paths[0], paths[1]).then(() => remove(path, paths[0]))
            console.log(currrentlyPathText + path)
            break
        }
        case ('.exit'): {
            rl.close()
            break
        }
        default : {
            console.log('Invalid input')
        }
    }
})

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
});
