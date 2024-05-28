const { createLocalStorage } = require('localstorage-ponyfill')
const {
	ActionRowBuilder,
	StringSelectMenuBuilder
} = require('discord.js')

const returnCharaList = (charaData) => {
	const commands = charaData.commands
		.split('\n')
		.filter(i => i)

	const selectMenus = Array(Math.floor(commands.length / 25) + 1)
		.fill()
		.map((i, index) => new StringSelectMenuBuilder()
			.setCustomId(`charadicerolled.${index}`)
			.setPlaceholder(`振るダイスを選択... (${index + 1}ページ)`)
		)
	commands.forEach((command, index) => {
		const selectMenu = selectMenus[Math.floor(index / 25)]
		const paramReplaced = command.replace(/{(.+?)}/g, (match, p1) => {
			return [...charaData.params, ...charaData.status]
				.filter(param => param.label === p1)[0]?.value ?? 0
		})
		selectMenu.addOptions({
			label: command,
			description: paramReplaced,
			value: paramReplaced,
		})
	})
	const actionRows = selectMenus.map(s => new ActionRowBuilder().addComponents(s))
	return actionRows
}

module.exports.execute = async interaction => {
	const localStorage = createLocalStorage()
	const userSetting = JSON.parse(localStorage.getItem(interaction.user.id)) ?? {}
	if (!userSetting.chara) {
		await interaction.reply({
			content: `チャットパレットが設定されていません。`,
			ephemeral: true
		})
	}
	const charaData = userSetting.chara

	await interaction.reply({
		content: `ダイスを選択してください`,
		ephemeral: true,
		components: returnCharaList(charaData)
	})
}
