const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  data: {
    name: "earthquake",
    description: "地震情報を表示",
  },
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })
    const rawQuake = await (await fetch('https://api.p2pquake.net/v2/jma/quake?limit=40')).json()
    /**
     * @see https://gist.github.com/sevenc-nanashi/67bfed2bdd0758eb20ac9bcd6fd88f84
     */
    const scale = [];

    [scale[10], scale[20], scale[30], scale[40], scale[45], scale[50], scale[55], scale[60], scale[70]] = ['[30m1　', '[34m2　', '[32m3　', '[33m4　', '[35m5弱', '[35m5強', '[31m6弱', '[31m6強', '[37;1;41m7　'];
    const quake = rawQuake.filter(info => scale[info.earthquake.maxScale] != undefined && info.earthquake.hypocenter.name !== '' && info.earthquake.hypocenter.depth != -1 && info.earthquake.hypocenter.magnitude != -1);
    const embed = new EmbedBuilder()
      .setTitle('地震情報')
      .setColor('#58b058')
      .setTimestamp()
      .setFooter({ text: '情報源:気象庁' });
    const arr = ['過去25件の地震を表示します\n```ansi']

    for (let n = 0; n < 25; n++) {
      const date = new Date(quake[n].earthquake.time)
      const time = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      arr.push(`震度:${scale[quake[n].earthquake.maxScale]}|${quake[n].earthquake.hypocenter.name.padEnd(8, '　')}[0m|${time}|${quake[n].earthquake.hypocenter.depth.toString().padEnd(2, ' ')}km|M${quake[n].earthquake.hypocenter.magnitude}`)
    }
    arr.push('\n```')

    embed.setDescription(arr.join('\n'))

    interaction.editReply({ embeds: [embed] })
  }
}