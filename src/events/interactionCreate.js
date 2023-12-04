const {
    Events,
    InteractionType
} = require('discord.js');

module.exports.name = Events.InteractionCreate
module.exports.execute = async (interaction) => {
    switch (interaction.type) {
        case InteractionType.ApplicationCommand: {
            const { commands } = require('../interactions/index');

            const commandInfo = commands[interaction.commandName];
            try {
                if (interaction.options.getSubcommand(false)) {
                    require(`../interactions/commands/${interaction.commandName}/${interaction.options.getSubcommand()}`).execute(interaction)
                    return
                }
                await commandInfo.execute(interaction);
            } catch (e) {
                console.error(e)
                await interaction.reply({
                    content: 'コマンドを実行中にエラーが発生しました',
                    ephemeral: true,
                })
            }
            break;
        }
        case InteractionType.ApplicationCommandAutocomplete: {
            try {
                const focusedOption = interaction.options.getFocused(true);
                require(`../interactions/autocomplete/${focusedOption.name}`).execute(interaction)
            } catch (e) {
                console.error(e)
            }
            break;
        }
        case InteractionType.MessageComponent: {
            try {
                require(`../interactions/messageComponents/${interaction.customId}`).execute(interaction)
            } catch (e) {
                console.error(e)
            }
            break;
        }
        case InteractionType.ModalSubmit: {
            try {
                require(`../interactions/modalSubmits/${interaction.customId}`).execute(interaction)
            } catch (e) {
                console.error(e)
            }
            break;
        }
    }
}