const {
	Events,
	messageLink
} = require('discord.js')

const { DynamicLoader } = require('bcdice')
const { createLocalStorage } = require('localstorage-ponyfill')
const { toHankakuAlphabet } = require('../util/toHankaku')
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

		message.reply(result.text)
	}
	if (message.content === 'qd') {
		const localStorage = createLocalStorage()
		const userSetting = JSON.parse(localStorage.getItem(message.author.id)) ?? {}
		const loader = new DynamicLoader()
		const diceCommand = userSetting?.quickDice?.cmd ?? '1d100'
		const gameSystem = await loader.dynamicLoad(userSetting?.quickDice?.gameSystem ?? 'DiceBot')

		try {
			const result = gameSystem.eval(diceCommand)
			message.reply(result.text)
		} catch (e) {
			const replyMsg = await message.reply({
				content: `エラーが発生しました。コマンドが間違っている又はサーバーエラーの可能性があります。`
			})
			setTimeout(() => {
				replyMsg.delete()
			}, 5000)
		}
	}
}
