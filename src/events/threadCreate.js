const {
    Events
} = require('discord.js');

const {client} = require('..')

module.exports.name = Events.ThreadCreate
module.exports.run = async thread => {
	if (thread.parentId == '1131887400860266546') {
		thread.send(roleMention('1142349248558542861'))
	}
}