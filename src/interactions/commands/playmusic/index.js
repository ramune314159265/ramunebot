const { ApplicationCommandOptionType } = require('discord.js')
module.exports = {
	data: {
		name: 'playmusic',
		description: '音楽を再生します',
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: 'youtube',
				description: 'Youtubeから再生します',
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: 'url',
						description: '動画URLを指定します',
						required: true,
					}, {
						type: ApplicationCommandOptionType.String,
						name: 'loop',
						description: 'ループするか指定します',
						required: true,
						choices: [
							{ name: 'オン', value: 'true' },
							{ name: 'オフ', value: 'false' },
						]
					}, {
						type: ApplicationCommandOptionType.String,
						name: 'volume',
						description: '音量を指定します',
						required: false,
						choices: [
							{ name: '100%', value: '1' },
							{ name: '90%', value: '0.9' },
							{ name: '80%', value: '0.8' },
							{ name: '70%', value: '0.7' },
							{ name: '60%', value: '0.6' },
							{ name: '50%', value: '0.5' },
							{ name: '40%', value: '0.4' },
							{ name: '30%', value: '0.3' },
							{ name: '20%', value: '0.2' },
							{ name: '10%', value: '0.1' },
						]
					}, {
						type: ApplicationCommandOptionType.String,
						name: 'messagetype',
						description: '送信メッセージのタイプを指定します',
						required: false,
						choices: [
							{ name: '一時的メッセージ(自分のみ)', value: 'ephemeral' },
							{ name: '通常メッセージ', value: 'message' },
						]
					},
				]
			}, {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'youtubeplaylist',
				description: 'Youtubeのプレイリストから順番に再生します',
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: 'url',
						description: 'プレイリストのURLを指定します',
						required: true,
					}, {
						type: ApplicationCommandOptionType.String,
						name: 'messagetype',
						description: '送信メッセージのタイプを指定します',
						required: false,
						choices: [
							{ name: '一時的メッセージ(自分のみ)', value: 'ephemeral' },
							{ name: '通常メッセージ', value: 'message' },
						]
					},
				],
			}
		]
	}
}
