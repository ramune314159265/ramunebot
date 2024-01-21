const { EmbedBuilder } = require('discord.js');
module.exports = {
	data: {
		name: "ping",
		description: "応答速度測定"
	},
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle(interaction.client.user.tag)
			.setColor('#58b058')
			.addFields(
				{
					name: 'WS Ping',
					value: `${interaction.client.ws.ping}ms`,
					inline: true
				},
				{
					name: 'Memory Resident Set Size',
					value: `${process.memoryUsage().rss / 1000000}MB`,
					inline: true
				},
				{
					name: 'Memory heapTotal',
					value: `${process.memoryUsage().heapTotal / 1000000}MB`,
					inline: true
				},
				{
					name: 'Memory heapUsed',
					value: `${process.memoryUsage().heapUsed / 1000000}MB`,
					inline: true
				},
				{
					name: 'Memory external',
					value: `${process.memoryUsage().external / 1000000}MB`,
					inline: true
				},
				{
					name: 'Memory arrayBuffers',
					value: `${process.memoryUsage().arrayBuffers / 1000000}MB`,
					inline: true
				},
				{
					name: 'Process PID',
					value: `${process.pid}`,
					inline: true
				},
			)
		await interaction.reply({ embeds: [embed], ephemeral: true });
	}
}