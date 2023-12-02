const { UserDefinedDiceTable } = require('bcdice');

module.exports.execute = async interaction => {
    const diceTable = interaction.fields.getTextInputValue('dicetablecontent');
    try {
        const diceTableResult = new UserDefinedDiceTable(diceTable).roll();
        await interaction.reply({ content: diceTableResult.text });
    } catch (e) {
        interaction.reply({
            content: `エラーが発生しました。コマンドが間違っている又はサーバーエラーの可能性があります。`,
            ephemeral: true
        })
    }
}