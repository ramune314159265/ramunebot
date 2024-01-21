const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
	data: {
		name: "geticon",
		description: "指定したユーザーのアイコンを取得します",
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "ユーザーを指定",
			},
		]
	},
	async execute(interaction) {
		const user = interaction.options.getUser("user")
		if (!user) {
			return interaction.reply({
				content: "ユーザーを取得できませんでした",
				ephemeral: true
			})
		}
		const iconURL = user.displayAvatarURL({ extension: 'png' })
		if (!iconURL) {
			return interaction.reply({
				content: "アイコンを取得できませんでした",
				ephemeral: true
			})
		}
		await interaction.reply({
			content: `${iconURL}`,
			ephemeral: true
		})
	}
}