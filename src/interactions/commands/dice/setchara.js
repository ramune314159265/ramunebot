const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports.execute = async interaction => {
	const modal = new ModalBuilder()
		.setCustomId('setchara')
		.setTitle('キャラシートの設定')

	const diceTableInput = new TextInputBuilder()
		.setCustomId('charadata')
		.setLabel('チャットパレット(ココフォリア駒出力)を入力')
		.setMaxLength(4000)
		.setRequired(true)
		.setPlaceholder(`{"kind":"character","data":{"name":"例","initiative":11,"externalUrl":"https://example.com/***"...`)
		.setStyle(TextInputStyle.Paragraph)

	modal.addComponents(new ActionRowBuilder().addComponents(diceTableInput))

	await interaction.showModal(modal)
}
