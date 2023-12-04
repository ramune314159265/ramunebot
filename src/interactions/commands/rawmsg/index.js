const { codeBlock } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord.js');
module.exports = {
    data: {
        name: "コードブロックで表示",
        description: "",
        type: ApplicationCommandType.Message
    },
    async execute(interaction) {
        const target = interaction.targetMessage.content
        const codeblock = codeBlock(target)
        await interaction.reply({
            content: codeblock,
            ephemeral: true,
        })
    }
}