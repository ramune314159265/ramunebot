const {
    Events
} = require('discord.js');

module.exports.name = Events.ClientReady
module.exports.execute = () => {
    console.log('logged in')
    require('../interactions/index')
}