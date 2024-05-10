const {
	Events,
	messageLink,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require('discord.js')

const { DynamicLoader } = require('bcdice')
const { createLocalStorage } = require('localstorage-ponyfill')
const { toHankakuAlphabet } = require('../util/toHankaku')
const { getIacharaEmbed } = require('../util/iachara')
const { sendAsUser } = require('../util/asUser')
const { truncate } = require('../util/truncate')
const mainLoader = new DynamicLoader()
let defaultGameSystem
(async () => {
	defaultGameSystem = await mainLoader.dynamicLoad('Cthulhu')
})()

module.exports.name = Events.MessageCreate
module.exports.execute = async message => {
	if (message.author.bot || message.system) return
	if (message.channel.name == '英文大会') {
		message.channel.sendTyping()
		try {
			const result = await (await fetch(`https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec?text=${message.content}&source=en&target=ja`)).json()
			message.reply(result.text)
		} catch (e) {
			message.react('❗')
		}
	}
	//ダイスコマンドか
	if (toHankakuAlphabet(message.content).match(defaultGameSystem.COMMAND_PATTERN)) {
		const diceCommand = toHankakuAlphabet(message.content)
		const result = defaultGameSystem.eval(diceCommand)
		if (result.secret) {
			message.reply('**Secret Dice** 🎲')
			message.author.send(`${messageLink(message.channelId, message.id)}\n${result.text}`)
			return
		}
		message.delete()

		const repliedMessage = message.reference?.messageId ? await message.channel.messages.fetch(message.reference?.messageId) : null
		sendAsUser({
			message: {
				content: `${message.content} ${result.text}`,
				...(repliedMessage && {
					components: [
						repliedMessage ?
							new ActionRowBuilder().addComponents(
								new ButtonBuilder()
									.setStyle(ButtonStyle.Link)
									.setLabel(`返信元: @${repliedMessage.member?.displayName ?? repliedMessage.author.username ?? '不明'}「${truncate(repliedMessage.cleanContent, 30)}」`)
									.setURL(repliedMessage.url)
							) : {}
					]
				})
			},
			channel: message.channel,
			member: message.member
		})

		if (!process.env.DICE_GAS_URL) {
			return
		}
		const sendToGasData = {
			username: message.author.username,
			rands: result.rands
				.filter(rand => rand[1] === 100)
				.map(rand => rand[0])
		}
		fetch(process.env.DICE_GAS_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sendToGasData)
		})
	}
	if (message.content === 'qd') {
		const localStorage = createLocalStorage()
		const userSetting = JSON.parse(localStorage.getItem(message.author.id)) ?? {}
		const loader = new DynamicLoader()
		const diceCommand = userSetting?.quickDice?.cmd ?? '1d100'
		const gameSystem = await loader.dynamicLoad(userSetting?.quickDice?.gameSystem ?? 'DiceBot')

		try {
			const result = gameSystem.eval(diceCommand)
			sendAsUser({
				message: {
					content: `${diceCommand} ${result.text}`
				},
				channel: message.channel,
				member: message.member
			})
			message.delete()
		} catch (e) {
			const replyMsg = await message.reply({
				content: `エラーが発生しました。コマンドが間違っている又はサーバーエラーの可能性があります。`
			})
			setTimeout(() => {
				replyMsg.delete()
			}, 5000)
		}
	}
	if (/https:\/\/iachara.com\/view\/(?:\d{1,8})/.test(message.content)) {
		const regexpResult = /https:\/\/iachara.com\/view\/(?<id>\d{1,8})/.exec(message.content)
		if (regexpResult === null) {
			return
		}
		const id = regexpResult.groups.id
		const embed = await getIacharaEmbed(id)
		if (!embed) {
			return
		}

		await message.channel.send({
			content: '',
			embeds: [embed],
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setLabel(`iachara.com/view/${id}`)
						.setURL(`https://iachara.com/view/${id}`)
				)
			]
		})
		message.suppressEmbeds(true)
	}
}
