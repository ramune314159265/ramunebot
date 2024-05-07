const {
	userMention,
	ApplicationCommandOptionType
} = require('discord.js')

module.exports = {
	data: {
		name: 'call',
		description: '通話に招待します',
		dm_permission: false,
		options: [{
			type: ApplicationCommandOptionType.Channel,
			name: 'invitechannel',
			description: '招待する通話チャンネルを指定します',
			required: false
		}]
	},
	async execute(interaction) {
		console.log(interaction.guild.channels.cache.find(channel => channel.isVoiceBased()))
		const inviteChannel = interaction.options.getChannel('invitechannel') ?? interaction.guild.channels.cache.find(channel => channel.isVoiceBased())
		if (!inviteChannel) {
			await interaction.reply({ content: 'ボイスチャンネルが存在しません', ephemeral: true })
			return
		}
		if (!inviteChannel.isVoiceBased) {
			await interaction.reply({ content: '指定したチャンネルはボイスチャンネルではありません', ephemeral: true })
			return
		}
		const message = await interaction.guild.systemChannel
			.send(`<@&1034812075635126332> ${userMention(interaction.user.id)}が https://discord.com/channels/${interaction.guild.id}/${inviteChannel.id} に招待しています`)
		await interaction.reply({ content: '招待を送信します', ephemeral: true })
		await message.react('982830355222515742')
	}
}
