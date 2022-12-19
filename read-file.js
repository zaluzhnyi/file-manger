import {createReadStream} from 'node:fs';
import cd from './cd-path.js'


const read = async (currentPath, path) => {
    const pathToFile = await cd(currentPath, path)
    if (currentPath !== pathToFile) {
        const readStream = createReadStream(pathToFile, 'utf8')
        const chunks = [];
        for await (const chunk of readStream) {
            chunks.push(chunk);
        }
        console.log(chunks.join(' '));
    }
}
export default read