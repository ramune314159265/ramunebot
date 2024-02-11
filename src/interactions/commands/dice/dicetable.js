const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports.execute = async interaction => {
	const modal = new ModalBuilder()
		.setCustomId('dicetable')
		.setTitle('ダイステーブル表の実行');

	const diceTableInput = new TextInputBuilder()
		.setCustomId('dicetablecontent')
		.setLabel('ダイステーブル表')
		.setMaxLength(1000)
		.setRequired(true)
		.setPlaceholder(`例:テスト表
1D4
1:りんご
2:みかん
3:いちご
4:ぶどう`)
		.setStyle(TextInputStyle.Paragraph);

	modal.addComponents(new ActionRowBuilder().addComponents(diceTableInput))

	await interaction.showModal(modal);
}