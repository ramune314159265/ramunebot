const { DynamicLoader } = require('bcdice')

module.exports.execute = async interaction => {
	const diceCommand = interaction.options.getString('cmd')
	const loader = new DynamicLoader()
	const gameSystem = await loader.dynamicLoad(interaction.options.getString('gamesystem') ?? 'DiceBot')
	try {
		const result = gameSystem.eval(diceCommand)
		await interaction.reply({
			content: `${result.text}`,
			ephemeral: interaction.options.getString('messagetype') === 'ephemeral' ? true : false
		})
	} catch (e) {
		console.error(e)
		interaction.reply({
			content: `エラーが発生しました。コマンドが間違っている又はサーバーエラーの可能性があります。`,
			ephemeral: true
		})
	}
}