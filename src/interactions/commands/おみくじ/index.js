const { randomFromArray } = require('../../../util/random')

module.exports = {
	data: {
		name: 'おみくじ',
		description: 'おみくじを引きます(完全ランダム)',
	},
	async execute(interaction) {
		const list = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶']
		await interaction.reply({ content: randomFromArray(list), ephemeral: true })
	}
}
