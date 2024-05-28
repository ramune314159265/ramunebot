const { createLocalStorage } = require('localstorage-ponyfill')

module.exports.execute = async interaction => {

	try {
		const charaData = JSON.parse(interaction.fields.getTextInputValue('charadata')).data

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
