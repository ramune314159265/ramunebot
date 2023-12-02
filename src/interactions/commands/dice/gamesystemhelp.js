const { DynamicLoader, Version } = require('bcdice');

module.exports.execute = async interaction => {
    const loader = new DynamicLoader();
    const gameSystem = await loader.dynamicLoad(interaction.options.getString('gamesystem'));
    try {
        await interaction.reply({
            content: `## ${gameSystem.NAME}(${gameSystem.ID})のヘルプ\n${gameSystem.HELP_MESSAGE}`,
            ephemeral: interaction.options.getString('messagetype') === 'message' ? false : true
        })
    } catch (e) {
        console.error(e)
        interaction.reply({
            content: `エラーが発生しました。ゲームシステムが間違っている又はサーバーエラーの可能性があります。`,
            ephemeral: true
        })
    }
}
