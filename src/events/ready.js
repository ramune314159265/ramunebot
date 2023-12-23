const {
    Events
} = require('discord.js');

module.exports.name = Events.ClientReady
module.exports.execute = () => {
    console.log('logged in')
    require('../interactions/index')

    fs.readdirSync('./src/features')
        .filter(file => file.endsWith('.js'))
        .forEach(file => require(`./events/${file}`))
}