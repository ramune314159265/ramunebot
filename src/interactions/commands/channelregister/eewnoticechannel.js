const { createLocalStorage } = require('localstorage-ponyfill');
const { channelMention } = require('discord.js')

module.exports.execute = async interaction => {
	const localStorage = createLocalStorage();
	const eewChannels = JSON.parse(localStorage.getItem('eewChannels')) ?? {}

	const channel = interaction.options.getChannel('channel')

	if (!channel) {
		eewChannels[interaction.guildId] = ''
		localStorage.setItem('eewChannels', JSON.stringify(eewChannels))

		interaction.reply({
			content: `地震通知チャンネルチャンネルを解除しました`,
			ephemeral: true
		})
		return
	}
	eewChannels[interaction.guildId] = channel.id
	localStorage.setItem('eewChannels', JSON.stringify(eewChannels))

	interaction.reply({
		content: `地震通知チャンネルを${channelMention(channel.id)}に設定しました`,
		ephemeral: true
	})
}