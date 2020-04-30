#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

async function main() {
    try {
        const appJsonData = await loadConfig()

        const filePath = path.join(__dirname, '..', 'app.json')

        const appJsonStringified = JSON.stringify(appJsonData, null, 4)

        await writeFile(filePath, appJsonStringified, { encoding: 'utf8' })

        console.log('app.json generated correctly')
    } catch (error) {
        console.log(`error generating app.json file`, error)
    }
}

async function loadConfig() {
    const base = await readConfigFile('base.json')
    const env = await readConfigFile('.env.json')

    return {
        expo: {
            ...base.expo,
            ...{
                extra: env
            }
        }
    }
}

async function readConfigFile(fileName) {
    const filePath = path.join(__dirname, '../config', fileName)

    console.log(`Reading  ${fileName}`, filePath)

    const file = await readFile(filePath, 'utf8')

    return JSON.parse(file)
}

main()
