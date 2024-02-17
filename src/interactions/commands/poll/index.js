const { EmbedBuilder ,ApplicationCommandOptionType } = require('discord.js')
module.exports = {
	data: {
		name: "poll",
		description: "投票とかアンケートとかできます",
		options: [
			{
				type: ApplicationCommandOptionType.String,
				name: "title",
				description: "タイトルを入力します",
				required: true,
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "type",
				description: "タイプを入力します(投票、アンケートとか)",
				required: true,
				choices: [
					{ name: "アンケート", value: "アンケート" },
					{ name: "投票", value: "投票" },
					{ name: "クイズ", value: "クイズ" },
				]
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "choice",
				description: "選択肢を入力します。&で区切ります(例: 選択肢1&選択肢2&選択肢3)",
				required: true,
			}
		]
	},
	async execute(interaction) {
		const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿', '0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟', '🔢']
		const choices = interaction.options.getString('choice').split('&')
		if (choices.length < 2){
			await interaction.reply({
				content:'選択肢を2つ以上入れてください',
				ephemeral: true
			})
			return false
		}
		const embed = new EmbedBuilder()
			.setTitle(interaction.options.getString('title'))
			.setColor('#58b058')
			.setDescription(choices.map((c, i) => `${emojis[i]} ${c}`).join('\n'))
		await interaction.reply({
			content: `<@${interaction.user.id}>が${interaction.options.getString('type')}を開始しました`,
			embeds: [embed]
		})
		const msg = await interaction.fetchReply()
		emojis.slice(0, choices.length).forEach(emoji => msg.react(emoji))
	}
}