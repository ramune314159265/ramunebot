const { EmbedBuilder } = require('discord.js');
const { createLocalStorage } = require('localstorage-ponyfill');
const {
    quakeScales,
    quakeScalesByName,
    domesticTsunamiInfos,
    magnitudeNormalizer,
    depthNormalizer,
} = require('../util/earthquake');
const { WebSocket } = require('ws');
const p2pQuakeWs = new WebSocket('wss://api.p2pquake.net/v2/ws');
const wolfxWs = new WebSocket('wss://ws-api.wolfx.jp/jma_eew');

const sendEEWInfo = (embed) => {
    const localStorage = createLocalStorage();
    const noticeChannels = JSON.parse(localStorage.getItem('eewChannels'));

    const { client } = require('../index');
    for (const [key, value] of Object.entries(noticeChannels)) {
        client.channels.cache.get(value).send({
            embeds: [embed],
        });
    }
};

p2pQuakeWs.addEventListener('message', (message) => {
    const rawData = JSON.parse(message.data);
    console.log(rawData);

    const embed = new EmbedBuilder();

    switch (rawData.code) {
        //地震情報
        case 551:
            embed
                .setTitle('地震情報')
                .setDescription(
                    [
                        `震源…${rawData.earthquake.hypocenter.name ?? '不明'}`,
                        `最大震度…${quakeScales[rawData.earthquake.maxScale].name}`,
                        `地震規模…${magnitudeNormalizer(rawData.earthquake.hypocenter.magnitude)}`,
                        `深さ…${depthNormalizer(rawData.earthquake.hypocenter.depth)}`,
                        `津波…${domesticTsunamiInfos[rawData.earthquake.domesticTsunami]}`,
                    ].join('\n'),
                )
                .setColor(quakeScales[rawData.earthquake.maxScale].hexColor ?? 'White')
                .setURL('https://www.jma.go.jp/bosai/map.html?contents=earthquake_map')
                .setFooter({ text: `情報源:${rawData.issue.source},${rawData._id}` })
                .setTimestamp(new Date(rawData.earthquake.time));

            sendEEWInfo(embed);
            break;
        case 554:
            embed
                .setTitle('緊急地震速報!')
                .setDescription('地震を検出しました')
                .setColor('Red')
                .setTimestamp(new Date(rawData.time));

            sendEEWInfo(embed);
        case (556 && rawData.cancelled):
            embed
                .setTitle('キャンセル - 緊急地震速報(予報)')
                .setDescription('緊急地震速報はキャンセルされました')
                .setColor('Green')
                .setTimestamp(new Date(rawData.time));

            sendEEWInfo(embed);
            break;
        case 556:
            embed
                .setTitle(`第${rawData.issue.serial}報 - 緊急地震速報(警報)`)
                .setDescription(
                    [
                        `震源…${rawData.earthquake.hypocenter.name ?? '不明'}`,
                        `地震規模…${magnitudeNormalizer(rawData.earthquake.hypocenter.magnitude)}`,
                        `深さ…${depthNormalizer(rawData.earthquake.hypocenter.depth)}`,
                    ].join('\n'),
                )
                .setColor('Red')
                .setFooter({ text: `${rawData.eventId}` })
                .setTimestamp(new Date(rawData.earthquake.originTime));

            sendEEWInfo(embed);
        default:
            break;
    }
});

wolfxWs.addEventListener('message', (message) => {
    const rawData = JSON.parse(message.data);
    console.log(rawData);
    if (!(rawData.type === 'jma_eew')) {
        return;
    }

    const { client } = require('../index');
    client.channels.cache.get('974599935053942815').send(message.data);

    const embed = new EmbedBuilder();

    switch (true) {
        case rawData.isCancel:
            embed
                .setTitle('キャンセル - 緊急地震速報(予報)')
                .setDescription('緊急地震速報はキャンセルされました')
                .setColor('Green')

            sendEEWInfo(embed);
            break;
        default:
            embed
                .setTitle(`${rawData.isFinal ? '最終報' : `第${rawData.Serial}報`} - 緊急地震速報(予報)`)
                .setDescription(
                    [
                        `震源…${rawData.Hypocenter ?? '不明'}${isSea ? '(海上)' : ''}`,
                        `最大震度…${rawData.MaxIntensity}(${rawData.isAssumption ? '仮定震源要素' : ''})`,
                        `地震規模…${magnitudeNormalizer(rawData.Magunitude)}`, //Magunitude APIのタイポ
                        `深さ…${depthNormalizer(rawData.Depth)}`,
                    ].join('\n'),
                )
                .setURL('https://www.jma.go.jp/bosai/map.html?contents=earthquake_map')
                .setColor(quakeScalesByName[rawData.MaxIntensity]?.hexColor ?? 'White')
                .setTimestamp(rawData.OriginTime);

            sendEEWInfo(embed);
            break;
    }
});
