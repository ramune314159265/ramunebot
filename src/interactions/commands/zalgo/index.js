const { ApplicationCommandType } = require('discord.js');
module.exports = {
	data: {
		name: 'Zalgo',
		description: '',
		type: ApplicationCommandType.Message
	},
	async execute(interaction) {
		const target = interaction.targetMessage.content
		const zalgo = target
			.replace(/([a-zA-Z])/g, (_, c) => c + [...Array(Math.floor(Math.random() * 30))].map(() => String.fromCharCode(0x300 + Math.floor(Math.random() * 79))).join(''))
		await interaction.reply({
			content: zalgo,
			ephemeral: true,
		})
	}
}