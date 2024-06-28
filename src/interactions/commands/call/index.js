const {
	userMention,
	ApplicationCommandOptionType,
	roleMention
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
		}, {
			type: ApplicationCommandOptionType.Role,
			name: 'targetrole',
			description: '招待する対象のロールを指定します',
			required: false
		}]
	},
	async execute(interaction) {
		const inviteChannel = interaction.options.getChannel('invitechannel') ?? interaction.guild.channels.cache.find(channel => channel.isVoiceBased())
		if (!inviteChannel) {
			await interaction.reply({ content: 'ボイスチャンネルが存在しません', ephemeral: true })
			return
		}
		if (!inviteChannel.isVoiceBased) {
			await interaction.reply({ content: '指定したチャンネルはボイスチャンネルではありません', ephemeral: true })
			return
		}
		const targetRole = interaction.options.getRole('targetrole').id ?? '1034812075635126332'
		const message = await interaction.guild.systemChannel
			.send(`${roleMention(targetRole)} ${userMention(interaction.user.id)}が https://discord.com/channels/${interaction.guild.id}/${inviteChannel.id} に招待しています`)
		await interaction.reply({ content: '招待を送信します', ephemeral: true })
		await message.react('982830355222515742')
	}
}
