import {dirname} from 'node:path'

const up = async (path) => dirname(path)
export default up