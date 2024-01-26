const { ButtonStyle,
    ButtonBuilder,
    ActionRowBuilder,
    ComponentType,
    blockQuote
} = require('discord.js');
const { randomRangeInt } = require('../../../util/randomRange')
const { truncate } = require('../../../util/truncate')

module.exports.execute = async interaction => {
    const diceCount = interaction.options.getInteger('x')
    const diceSides = interaction.options.getInteger('y')

    if ((diceCount * diceSides) > Number.MAX_SAFE_INTEGER) {
        interaction.reply({
            content: `数字が大きすぎます。最大値が${Number.MAX_SAFE_INTEGER}以下になるようにしてください。`,
            ephemeral: true
        })
        return
    }

    await interaction.deferReply({ ephemeral: interaction.options.getString('messagetype') === 'ephemeral' ? true : false })

    const diceResults = new Array(diceCount)
        .fill(0)
        .map(i => randomRangeInt(1, diceSides))

    const total = diceResults.reduce((previous, current) => previous + current)

    const message = await interaction.editReply({
        content: `(${diceCount}D${diceSides}) ＞ ${total}`,
        ephemeral: interaction.options.getString('messagetype') === 'ephemeral' ? true : false,
        components: [
            new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId('next')
                    .setStyle(ButtonStyle.Primary)
                    .setLabel("出目を表示")
                    .setEmoji('🎲')
                )
        ]
    })

    const collector = await message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 12 * 60 * 60 * 1000 /*12時間*/ });

    collector.on('collect', collectorInteraction => {
        collectorInteraction.update({
            content: truncate(`(${diceCount}D${diceSides}) ＞ ${total}[${diceResults.join(',')}] ＞ ${total}`, 2000),
            components: []
        })
    })
}