const { DynamicLoader } = require('bcdice')
const { createLocalStorage } = require('localstorage-ponyfill')

module.exports.execute = async interaction => {
	const localStorage = createLocalStorage()
	const userSetting = JSON.parse(localStorage.getItem(interaction.user.id)) ?? {}
	const loader = new DynamicLoader()
	const gameSystem = await loader.dynamicLoad(interaction.options.getString('gamesystem') ?? 'DiceBot')

	const diceCommand = interaction.options.getString('cmd')

	userSetting.quickDice ??= {}

	userSetting.quickDice.cmd = diceCommand
	userSetting.quickDice.gameSystem = gameSystem.ID

	localStorage.setItem(interaction.user.id, JSON.stringify(userSetting))
	await interaction.reply({
		content: `クイックダイスを \`${diceCommand}\` (${gameSystem.NAME})に設定しました\n使うときは\`qd\`と入力してください`,
		ephemeral: true
	})
}
