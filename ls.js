import {readdir} from 'node:fs/promises'

const list = async (path) => {
    const files = await readdir(path, {
        "withFileTypes": true
    });
    const sortFiles = files
        .map((el) => {
            return {
                "name": el.name,
                "type": el.isFile() ? 'file' : 'directory'
            }
        })
        .sort(((a, b) => {
            if (a.type < b.type)
                return -1
            if (a.type > b.type)
                return 1
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1
            return 0
        }))
    console.table(sortFiles);

}
export default list;