const { DynamicLoader } = require('bcdice')

module.exports.execute = async interaction => {
	const loader = new DynamicLoader()
	const gameSystem = await loader.dynamicLoad(interaction.options.getString('gamesystem') ?? 'DiceBot')

	const diceCommand = interaction.options.getString('cmd')

	interaction.client.quickDice ??= {}
	interaction.client.quickDice[interaction.user.id] ??= {}

	interaction.client.quickDice[interaction.user.id].cmd = diceCommand
	interaction.client.quickDice[interaction.user.id].gameSystem = gameSystem.ID
	interaction.client.quickDice[interaction.user.id].regex = gameSystem.COMMAND_PATTERN

	await interaction.reply({
		content: `クイックダイスを \`${diceCommand}\` (${gameSystem.NAME})に設定しました\n使うときは\`qd\`と入力してください`,
		ephemeral: true
	})
}