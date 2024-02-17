const {
	Events
} = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports.name = Events.ClientReady
module.exports.execute = () => {
	console.log('logged in')
	require('../interactions/index')

	fs.readdirSync(path.join(__dirname, '../features'))
		.filter(file => file.endsWith('.js'))
		.forEach(file => require(path.join(__dirname, `../features/${file}`)))
}