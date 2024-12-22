const { ApplicationCommandOptionType, blockQuote, codeBlock } = require('discord.js')
const { randomFromArray } = require('../../../util/random')

module.exports = {
	data: {
		name: 'xmas',
		description: 'クリスマスツリーを表示します',
		dm_permission: false,
		options: [{
			type: ApplicationCommandOptionType.Integer,
			name: 'size',
			description: 'クリスマスツリーのサイズを指定します(最小5, 最大17, デフォルト15)',
			required: false
		}, {
			type: ApplicationCommandOptionType.String,
			name: 'messagetype',
			description: '送信メッセージのタイプを指定します',
			required: false,
			choices: [
				{ name: '一時的メッセージ(自分のみ)', value: 'ephemeral' },
				{ name: '通常メッセージ', value: 'message' },
			]
		}]
	},
	async execute(interaction) {
		// https://github.com/yug1224/xmas/blob/main/app.ts

		const height = Math.max(Math.min(interaction.options.getInteger('size'), 17), 5) ?? 20

		const topStar = ' \u2605' // ' ★'
		const fullWidthSolidus = '\u001b[32m\uFF0F' // '／'
		const fullWidthReverseSolidus = '\u001b[32m\uFF3C\n' // '＼'
		const ornaments = [
			' ',
			' ',
			' ',
			' ',
			'&',
			'@',
			'i',
			'⁂',
			'⸛',
			'⸮',
			'｡',
		]
		const colors = [
			33, // yellow
			34, // blue
			35, // magenta
			36, // cyan
			37, // white
		]
		const circumflexAccent = '\u001b[32m\u005e'

		let result = ''
		const write = s => {
			result += s
		}

		write('\n')

		// ツリーの背景部分
		for (let i = 0; i < height; i++) {
			write(' ')
		}

		// 星
		write('\u001b[33m' + topStar + '\n')

		const M = height * 2 - 1

		for (let i = 1; i <= height; i++) {
			// ツリー左半分の背景部分
			const O = i * 2 - 2
			const spaces = (M - O) / 2
			for (let i = 0; i < spaces; i++) {
				write(' ')
			}

			//ボールド解除
			write('\u001b[21m')

			// ツリー左側輪郭
			write(fullWidthSolidus)

			// オーナメント設定
			for (let i = 0; i < O; i++) {
				const ornament = randomFromArray(ornaments)
				if (ornament === ' ') {
					write(' ')
					continue
				}
				write(
					'\u001b[' +
					randomFromArray(colors) +
					'm' +
					randomFromArray(ornaments)
				)
			}

			// ツリー右側輪郭
			write(fullWidthReverseSolidus)

			// 色付け解除
			write('\u001b[0m')
		}
		write(' ')

		for (let i = 1; i < height; i++) {
			// ツリーの下側輪郭
			write(circumflexAccent)
		}

		// ツリーの幹
		write('|  |')
		for (let i = 1; i < height; i++) {
			// ツリーの下側輪郭
			write(circumflexAccent)
		}
		if (height > 10) {
			write('\n ')
			for (let i = 1; i < height; i++) {
				write(' ')
			}
			write('|  |')
		}
		write('\n\n')

		write('メリークリスマス!')

		await interaction.reply({
			content: codeBlock('ansi', result),
			ephemeral: interaction.options.getString('messagetype') === 'message' ? false : true
		})
	}
}
