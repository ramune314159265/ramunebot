const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	data: {
		name: "dice",
		description: "ダイス関連のコマンド",
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "roll",
				description: "ダイスコマンドを実行します",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "cmd",
						description: "ダイスコマンドを入力します",
						required: true,
					}, {
						type: ApplicationCommandOptionType.String,
						name: "gamesystem",
						description: "ゲームシステムを指定します(デフォルト:DiceBot)",
						required: false,
						autocomplete: true
					}, {
						type: ApplicationCommandOptionType.String,
						name: "messagetype",
						description: "送信メッセージのタイプを指定します",
						required: false,
						choices: [
							{ name: "一時的メッセージ(自分のみ)", value: "ephemeral" },
							{ name: "通常メッセージ(デフォルト)", value: "message" },
						]
					}
				]
			}, {
				type: ApplicationCommandOptionType.Subcommand,
				name: "setquickdice",
				description: "qd で実行するダイスを設定します。一定期間後にリセットされます。",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "cmd",
						description: "ダイスコマンドを入力します",
						required: true,
					}, {
						type: ApplicationCommandOptionType.String,
						name: "gamesystem",
						description: "ゲームシステムを指定します(デフォルト:DiceBot)",
						required: false,
						autocomplete: true
					},
				]
			}, {
				type: ApplicationCommandOptionType.Subcommand,
				name: "gamesystemhelp",
				description: "指定したゲームシステムのヘルプを表示します",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "gamesystem",
						description: "ゲームシステムを指定します",
						required: true,
						autocomplete: true
					}, {
						type: ApplicationCommandOptionType.String,
						name: "messagetype",
						description: "送信メッセージのタイプを指定します",
						required: false,
						choices: [
							{ name: "一時的メッセージ(自分のみ)", value: "ephemeral" },
							{ name: "通常メッセージ(デフォルト)", value: "message" },
						]
					}
				]
			}, {
				type: ApplicationCommandOptionType.Subcommand,
				name: "dicetable",
				description: "ダイステーブル表を実行します",
			},
		]
	}
}