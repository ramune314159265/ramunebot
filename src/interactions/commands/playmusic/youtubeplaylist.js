const { AudioPlayerStatus,
    createAudioPlayer,
    joinVoiceChannel,
    NoSubscriberBehavior
} = require('@discordjs/voice');
const { ButtonStyle,
    ButtonBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');
const ytpl = require('ytpl');
const wait = require('util').promisify(setTimeout);
const pick = require('../../../util/pick');
const getResource = require('../../../util/getYoutubeResource');

const controlButtons = {
    stop: new ButtonBuilder()
        .setCustomId(JSON.stringify({ behavior: 'stop' }))
        .setStyle(ButtonStyle.Danger)
        .setEmoji('⏹'),
    pause: new ButtonBuilder()
        .setCustomId(JSON.stringify({ behavior: 'pause' }))
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⏸'),
    play: new ButtonBuilder()
        .setCustomId(JSON.stringify({ behavior: 'play' }))
        .setStyle(ButtonStyle.Success)
        .setEmoji('▶'),
    next: new ButtonBuilder()
        .setCustomId(JSON.stringify({ behavior: 'next' }))
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('⏩'),
    back: new ButtonBuilder()
        .setCustomId(JSON.stringify({ behavior: 'back' }))
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('⏪'),
}
const getSelectMenu = (array, index) => {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(JSON.stringify({behavior: 'select' }))
        .setPlaceholder('選択...')
    const slicedItems = pick(array, index, 25/*セレクトメニューの限度*/)
    slicedItems.forEach(item => {
        selectMenu.addOptions({
            label: `${item.index}.${item.title}`,
            description: `https://youtube.com/watch?v=${item.id}`,
            value: (item.index - 1).toString(),
        })
    })
    return selectMenu
}

module.exports.execute = async interaction => {
    await interaction.deferReply({ ephemeral: interaction.options.getString('messagetype') === 'message' ? false : true })
    const playListUrl = interaction.options.getString('url')
    const playlist = await ytpl(await ytpl.getPlaylistID(playListUrl), { hl: 'ja' })
    let playAudioIndex = 0
    const member = interaction.member;
    const channel = member.voice.channel;

    if (!channel) {
        interaction.editReply({
            content: "接続先のボイスチャンネルが見つかりません。",
            ephemeral: true,
        });
        return
    }
    const connection = joinVoiceChannel({
        adapterCreator: channel.guild.voiceAdapterCreator,
        channelId: channel.id,
        guildId: channel.guild.id,
        selfDeaf: true,
        selfMute: false,
    });
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });
    const connectionSubscribe = connection.subscribe(player);

    const resource = getResource(playlist.items[playAudioIndex].id)

    player.play(resource)

    player.on(AudioPlayerStatus.Idle, async () => {
        await wait(1000)
        player.stop()
        playAudioIndex++
        const resource = getResource(playlist.items[playAudioIndex].id)
        player.play(resource)
    })

    const message = await interaction.editReply({
        content: `${playlist.title}( ${playlist.url} )を再生中`,
        ephemeral: true,
        components: [
            new ActionRowBuilder()
                .addComponents(controlButtons.back, controlButtons.stop, controlButtons.pause, controlButtons.next),
            new ActionRowBuilder()
                .addComponents(getSelectMenu(playlist.items,playAudioIndex))
        ]
    });

    const collector = await message.createMessageComponentCollector({ time: 12 * 60 * 60 * 1000 /*12時間*/ });

    collector.on('collect', collectorInteraction => {
        const interactionData = JSON.parse(collectorInteraction.customId)
        try {
            switch (interactionData.behavior) {
                case 'stop': {
                    player.stop()
                    connectionSubscribe.unsubscribe()
                    connection.destroy()
                    collectorInteraction.update({
                        content: `${playlist.url} を停止しました\nコマンドのサジェスト:  </playmusic youtube:1063729380888682547>,</playmusic youtubeplaylist:1063729380888682547>`,
                        ephemeral: true,
                        components: []
                    })
                    break;
                }
                case 'pause': {
                    player.pause()
                    collectorInteraction.update({
                        content: `${playlist.title}( ${playlist.url} )を一時停止中`,
                        ephemeral: true,
                        components: [
                            new ActionRowBuilder()
                                .addComponents(controlButtons.back, controlButtons.stop, controlButtons.play, controlButtons.next),
                            new ActionRowBuilder()
                                .addComponents(getSelectMenu(playlist.items,playAudioIndex))
                        ]
                    })
                }
                case 'play': {
                    player.unpause()
                    collectorInteraction.update({
                        content: `${playlist.title}( ${playlist.url} )を再生中`,
                        ephemeral: true,
                        components: [
                            new ActionRowBuilder()
                                .addComponents(controlButtons.back, controlButtons.stop, controlButtons.pause, controlButtons.next),
                            new ActionRowBuilder()
                                .addComponents(getSelectMenu(playlist.items,playAudioIndex))
                        ]
                    })
                }
                case 'next': {
                    player.stop()
                    playAudioIndex++
                    collectorInteraction.update({
                        content: `${playlist.title}( ${playlist.url} )を再生中`,
                        ephemeral: true,
                    })
                    const resource = getResource(playlist.items[playAudioIndex].id)
                    player.play(resource)
                }
                case 'back': {
                    player.stop()
                    playAudioIndex--
                    collectorInteraction.update({
                        content: `${playlist.title}( ${playlist.url} )を再生中`,
                        ephemeral: true,
                    })
                    const resource = getResource(playlist.items[playAudioIndex].id)
                    player.play(resource)
                }
                case 'select': {
                    player.stop()
                    playAudioIndex = Number(collectorInteraction.values[0])
                    collectorInteraction.update({
                        content: `${playlist.title}( ${playlist.url} )を再生中`,
                        ephemeral: true,
                    })
                    const resource = getResource(playlist.items[playAudioIndex].id)
                    player.play(resource)
                }
                default:
                    break;
            }
        } catch (e) {
            collectorInteraction.reply({
                content: 'エラーが発生しました' + e,
                ephemeral: true
            })
        }
    })
}