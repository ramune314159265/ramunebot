const fs = require('fs');
const path = require('path');

const { client } = require('../index')

const data = []

const commands = {}
fs.readdirSync('./src/interactions/commands')
    .forEach(file => {
        const commandInfo = require(`./commands/${file}/index`);
        commands[commandInfo.data.name] = commandInfo
        data.push(commands[commandInfo.data.name].data)
    });

client.application.commands.set(data, '972328945141829672');

module.exports.commands = commands