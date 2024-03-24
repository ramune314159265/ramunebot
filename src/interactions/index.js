const fs = require('fs')

const { client } = require('../index')

const data = []

console.log('loading commands...')
const commands = {}
fs.readdirSync('./src/interactions/commands')
    .forEach(file => {
        const commandInfo = require(`./commands/${file}/index`)
        commands[commandInfo.data.name] = commandInfo
        data.push(commands[commandInfo.data.name].data)
    })

client.application.commands.set(data, process.env.NODE_ENV === 'development' ? '972328945141829672' : null)
    .then(()=>console.log('commands set complete'))

module.exports.commands = commands
