const {
	Events,
	messageLink,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require('discord.js')

const { DynamicLoader } = require('bcdice')
const { createLocalStorage } = require('localstorage-ponyfill')
const { toHankakuAlphabet } = require('../util/toHankaku')
const { fetchIacharaData } = require('../util/iachara')
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
	if (/https:\/\/iachara.com\/view\/(?:\d{1,8})/.test(message.content)) {
		const regexpResult = /https:\/\/iachara.com\/view\/(?<id>\d{1,8})/.exec(message.content)
		if (regexpResult === null) {
			return
		}
		const id = regexpResult.groups.id
		const characterData = await fetchIacharaData(id)
		console.log(characterData)
		if (!characterData.success) {
			return
		}

		const embed = new EmbedBuilder()
			.setAuthor({
				name: 'いあきゃら',
				iconURL: 'https://iachara.com/img/favicon.ico'
			})
			.setTitle(`${characterData.data.data.profile.name} (${characterData.data.data.profile.age}歳)`)
			.setDescription(`
職業…${characterData.data.data.profile.profession}
身長…${characterData.data.data.profile.height}　体重…${characterData.data.data.profile.weight}
性別…${characterData.data.data.profile.sex}
出身…${characterData.data.data.profile.from}
髪…${characterData.data.data.profile.hairColor}　瞳…${characterData.data.data.profile.eyeColor}　肌…${characterData.data.data.profile.skinColor}

**能力値**
STR ${String(characterData.data.data.abilities.str.value).padStart(' ')}　CON ${String(characterData.data.data.abilities.con.value).padStart(' ')}　POW ${String(characterData.data.data.abilities.pow.value).padStart(' ')}　DEX ${String(characterData.data.data.abilities.dex.value).padStart(' ')}
APP ${String(characterData.data.data.abilities.app.value).padStart(' ')}　SIZ ${String(characterData.data.data.abilities.siz.value).padStart(' ')}　INT ${String(characterData.data.data.abilities.int.value).padStart(' ')}　EDU ${String(characterData.data.data.abilities.edu.value).padStart(' ')}
`.trim()
			)
			.setURL(`https://iachara.com/view/${id}`)
			.setColor('#1eff02')
			.setImage(characterData.data.data.profile.icons[0].url)

		message.channel.send({
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
