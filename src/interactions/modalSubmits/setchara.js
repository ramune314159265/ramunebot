const { createLocalStorage } = require('localstorage-ponyfill')

module.exports.execute = async interaction => {
	try {
		const charaData = JSON.parse(interaction.fields.getTextInputValue('charadata')).data
		const commands = charaData.commands
			.split('\n')
			.filter(i => i)
		charaData.commands = {}
		commands.forEach(command => {
			const key = /【(?<key>(.+?))】/.exec(command).groups?.key
			if (!key) {
				return
			}
			charaData.commands[key] = command
		});

		const localStorage = createLocalStorage()
		const userSetting = JSON.parse(localStorage.getItem(interaction.user.id)) ?? {}
		userSetting.chara = charaData

		localStorage.setItem(interaction.user.id, JSON.stringify(userSetting))
		await interaction.reply({
			content: `チャットパレットを ${charaData.name} のものにセットしました`,
			ephemeral: true
		})
	} catch (e) {
		await interaction.reply({
			content: `エラーが発生しました`,
			ephemeral: true
		})
	}
}
