const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')

const { quakeScales } = require('../../../util/earthquake')

module.exports = {
	data: {
		name: 'earthquake',
		description: '地震情報を表示',
	},
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true })
		const rawQuakeInfo = await (await fetch('https://api.p2pquake.net/v2/jma/quake?limit=40')).json()

		const quake = rawQuakeInfo.filter(info => info.earthquake.maxScale !== -1 && info.earthquake.hypocenter.name !== '' && info.earthquake.hypocenter.depth !== -1 && info.earthquake.hypocenter.magnitude !== -1)
		const embed = new EmbedBuilder()
			.setTitle('地震情報')
			.setColor('#58b058')
			.setTimestamp()
			.setFooter({ text: '情報源:気象庁' })
		const arr = ['過去25件の地震を表示します\n```ansi']

		for (let n = 0; n < 25; n++) {
			const date = new Date(quake[n].earthquake.time)
			const time = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
			arr.push(`震度:${quakeScales[quake[n].earthquake.maxScale].ansiColor + quakeScales[quake[n].earthquake.maxScale].name}|${quake[n].earthquake.hypocenter.name.padEnd(8, '　')}[0m|${time}|${quake[n].earthquake.hypocenter.depth.toString().padEnd(2, ' ')}km|M${quake[n].earthquake.hypocenter.magnitude}`)
		}
		arr.push('\n```')

		embed.setDescription(arr.join('\n'))

		interaction.editReply({ embeds: [embed] })
	}
}