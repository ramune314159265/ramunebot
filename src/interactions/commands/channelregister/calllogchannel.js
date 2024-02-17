const { createLocalStorage } = require("localstorage-ponyfill")
const { channelMention } = require('discord.js')

module.exports.execute = async interaction => {
	const localStorage = createLocalStorage()
	const guildSetting = JSON.parse(localStorage.getItem(interaction.guildId)) ?? {}

	const channel = interaction.options.getChannel('channel')
	if (!channel) {
		guildSetting.channelLog = ''
		localStorage.setItem(interaction.guildId, JSON.stringify(guildSetting))

		interaction.reply({
			content: `通話ログチャンネルを解除しました`,
			ephemeral: true
		})
		return
	}
	guildSetting.channelLog = channel.id
	localStorage.setItem(interaction.guildId, JSON.stringify(guildSetting))

	interaction.reply({
		content: `通話ログチャンネルを${channelMention(channel.id)}に設定しました`,
		ephemeral: true
	})
}