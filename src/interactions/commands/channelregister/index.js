const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: {
		name: "channelregister",
		description: "ボットの機能を有効化するチャンネルを指定するコマンド",
		default_member_permissions: PermissionFlagsBits.ManageGuild,
		dm_permission: false,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "calllogchannel",
				description: "通話ログチャンネルを指定します",
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "通話のログを取るチャンネルを指定します(空で解除)",
						required: false
					}
				]
			},{
				type: ApplicationCommandOptionType.Subcommand,
				name: "eewnoticechannel",
				description: "地震通知チャンネルを指定します",
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "地震の情報を送るチャンネルを指定します(空で解除)",
						required: false
					}
				]
			}
		]
	}
}