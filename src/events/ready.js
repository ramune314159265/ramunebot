const {
    Events
} = require('discord.js');

module.exports.name = Events.ClientReady
module.exports.run = () => {
    console.log('logged in')
    require('../interactions/index')
}