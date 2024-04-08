const {
	Events,
	roleMention,
	userMention
} = require('discord.js')

module.exports.name = Events.GuildScheduledEventCreate
module.exports.execute = async event => {
	if (event.guildId !== '930376081196875787') return
	event.client.channels.cache.get('1020881511899209851').threads.create({
		name: `${event.name}(${event.creator.username})`,
		message: {
			content: `${roleMention('1034811611271135252')} ${userMention(event.creatorId)} がイベントを作成しました https://discord.gg/dZVZKjy5t7?event=${event.id} \n ※もし参加できそうであれば下の興味ありボタンを押してください`
		}
	})
}
