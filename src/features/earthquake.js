const { EmbedBuilder } = require('discord.js');
const { createLocalStorage } = require('localstorage-ponyfill');
const {
    quakeScales,
    domesticTsunamiInfos,
    magnitudeNormalizer,
    depthNormalizer,
} = require('../util/earthquake');
const { WebSocket } = require('ws');
const p2pQuakeWs = new WebSocket('wss://api.p2pquake.net/v2/ws');
const wolfxWs = new WebSocket('wss://ws-api.wolfx.jp/jma_eew');

const sendEEWInfo = (embed) => {
    console.log('send');
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
                        `震源…${rawData.earthquake.hypocenter.name}`,
                        `最大震度…${quakeScales[rawData.earthquake.maxScale].name}`,
                        `地震規模…${magnitudeNormalizer(
                            rawData.earthquake.hypocenter.magnitude,
                        )}`,
                        `深さ…${depthNormalizer(rawData.earthquake.hypocenter.depth)}`,
                        `津波…${domesticTsunamiInfos[rawData.earthquake.domesticTsunami]}`,
                    ].join('\n'),
                )
                .setColor(quakeScales[rawData.earthquake.maxScale].hexColor ?? 'White')
                .setURL('https://www.jma.go.jp/bosai/map.html?contents=earthquake_map')
                .setFooter({ text: `情報源:${rawData.issue.source},${rawData._id}` })
                .setTimestamp(new Date(rawData.earthquake.time));
            break;
        case 554:
            embed
                .setTitle('緊急地震速報!')
                .setDescription('地震を検出しました')
                .setColor('Red')
                .setTimestamp(new Date(rawData.time));
        case 556 && rawData.cancelled:
            embed
                .setTitle('緊急地震速報(取り消し)')
                .setDescription('緊急地震速報はキャンセルされました')
                .setColor('Green')
                .setTimestamp(new Date(rawData.time));
            break;
        case 556:
            embed
                .setTitle('緊急地震速報(警報)')
                .setDescription(
                    [
                        `震源…${rawData.earthquake.hypocenter.name}(${rawData.earthquake.condition})`,
                        `地震規模…${magnitudeNormalizer(
                            rawData.earthquake.hypocenter.magnitude,
                        )}`,
                        `深さ…${depthNormalizer(rawData.earthquake.hypocenter.depth)}`,
                    ].join('\n'),
                )
                .setColor('Red')
                .setFooter({ text: `${rawData.eventId}` })
                .setTimestamp(new Date(rawData.earthquake.originTime));
        default:
            break;
    }

    sendEEWInfo(embed);
});

wolfxWs.addEventListener('message', (message) => {
    const rawData = JSON.parse(message.data);
    console.log(rawData);
    if (!(rawData.type === 'jma_eew')) {
        return;
    }

    const embed = new EmbedBuilder();

    const { client } = require('../index');
    client.channels.cache.get('974599935053942815').send(message.data);

    embed
        .setTitle('緊急地震速報(予報)')
        .setDescription(
            [
                `震源…${rawData.Hypocenter}`,
                `最大震度…${rawData.MaxIntensity}`,
                `地震規模…${magnitudeNormalizer(rawData.Magunitude)}`,
                `深さ…${depthNormalizer(rawData.Depth)}`,
            ].join('\n'),
        )
        .setURL('https://www.jma.go.jp/bosai/map.html?contents=earthquake_map')
        .setTimestamp(rawData.AnnouncedTime);

    sendEEWInfo(embed);
});
