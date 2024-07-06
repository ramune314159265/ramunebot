const { createLocalStorage } = require('localstorage-ponyfill')
const {
	ActionRowBuilder,
	StringSelectMenuBuilder,
	escapeItalic,
	ButtonBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ButtonStyle
} = require('discord.js')
const { sendAsUser } = require('../../../util/asUser')
const { DynamicLoader } = require('bcdice')
const { truncate } = require('../../../util/truncate')
const { createHash } = require('crypto')
const mainLoader = new DynamicLoader()

const userLastInteraction = {}

const returnCharaList = (charaData, hash) => {
	const commands = Object.values(charaData.commands)

	const selectMenus = Array(Math.ceil(commands.length / 25))
		.fill()
		.map((i, index) => new StringSelectMenuBuilder()
			.setCustomId(`${hash}.${index}`)
			.setPlaceholder(`振るダイスを選択... (${index + 1}ページ)`)
		)
	commands.forEach((command, index) => {
		const selectMenu = selectMenus[Math.floor(index / 25)]
		const paramReplaced = command.replace(/{(.+?)}/g, (match, p1) => {
			return [...charaData.params, ...charaData.status]
				.filter(param => param.label === p1)[0]?.value ?? 0
		})
		selectMenu.addOptions({
			label: command,
			description: paramReplaced,
			value: paramReplaced,
		})
	})
	const actionRows = selectMenus.map(s => new ActionRowBuilder().addComponents(s))
	return actionRows
}

module.exports.execute = async interaction => {
	const localStorage = createLocalStorage()
	const userSetting = JSON.parse(localStorage.getItem(interaction.user.id)) ?? {}
	if (!userSetting.chara) {
		await interaction.reply({
			content: `チャットパレットが設定されていません。`,
			ephemeral: true
		})
	}
	const charaData = userSetting.chara

	const timeStamp = Math.floor(performance.now()).toString()
	userLastInteraction[interaction.user.id] = interaction
	const message = await interaction.reply({
		content: `${charaData.name} として振るダイスを選択してください`,
		ephemeral: true,
		components: [
			...returnCharaList(charaData, timeStamp),
			new ActionRowBuilder()
				.addComponents(new ButtonBuilder()
					.setCustomId('customDice')
					.setLabel('カスタムダイス')
					.setStyle(ButtonStyle.Primary)
				)
		]
	})

	const defaultGameSystem = await mainLoader.dynamicLoad('Cthulhu')

	const collector = await message.createMessageComponentCollector({ time: 6 * 60 * 60 * 1000 /*6時間*/ })

	collector.on('collect', async collectorInteraction => {
		switch (collectorInteraction.customId) {
			case 'customDice': {
				const diceCommandInput = new TextInputBuilder()
					.setCustomId('diceCommand')
					.setLabel('ダイスコマンドを入力')
					.setStyle(TextInputStyle.Short)
					.setPlaceholder('例: 3d6+1d4')
					.setMaxLength(64)
					.setRequired(true)
				const modal = new ModalBuilder()
					.setCustomId('customDiceModal')
					.setTitle('カスタムダイス')
					.addComponents(new ActionRowBuilder()
						.addComponents(diceCommandInput)
					)

				await collectorInteraction.showModal(modal)
				const filter = (i) => i.customId === 'customDiceModal'
				const modalInteraction = await collectorInteraction.awaitModalSubmit({ filter, time: 1 * 60 * 1000 })
				const diceCommand = modalInteraction.fields.getTextInputValue('diceCommand')
				try {
					const result = defaultGameSystem.eval(diceCommand).text
					await modalInteraction.reply({
						content: '送信します',
						ephemeral: true
					})
					await sendAsUser({
						message: {
							content: escapeItalic(`${diceCommand} ${result}`)
						},
						avatar: charaData.iconUrl,
						name: `${truncate(charaData.name, 12)} / ${collectorInteraction.member.displayName}`,
						channel: collectorInteraction.channel
					})
				} catch (e) {
					modalInteraction.reply({
						content: 'エラーが発生しました。コマンドが間違っている又はサーバーエラーの可能性があります。',
						ephemeral: true
					})
				}

				break
			}

			default: {
				userLastInteraction[collectorInteraction.user.id].deleteReply?.()
				const interactionTimeStamp = collectorInteraction.customId.split('.')[0]
				if (timeStamp !== interactionTimeStamp) {
					return
				}
				const diceCommand = collectorInteraction.values[0]
				await sendAsUser({
					message: {
						content: escapeItalic(`${diceCommand} ${defaultGameSystem.eval(diceCommand).text}`)
					},
					avatar: charaData.iconUrl,
					name: `${truncate(charaData.name, 12)} / ${collectorInteraction.member.displayName}`,
					channel: collectorInteraction.channel
				})
				userLastInteraction[collectorInteraction.user.id] = collectorInteraction
				await collectorInteraction.reply({
					content: `${charaData.name} として振るダイスを選択してください`,
					ephemeral: true,
					components: [
						...returnCharaList(charaData, timeStamp),
						new ActionRowBuilder()
							.addComponents(new ButtonBuilder()
								.setCustomId('customDice')
								.setLabel('カスタムダイス')
								.setStyle(ButtonStyle.Primary)
							)
					]
				})
				break
			}
		}
	})
}
