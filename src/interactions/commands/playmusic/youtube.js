const { AudioPlayerStatus,
	createAudioPlayer,
	joinVoiceChannel,
	NoSubscriberBehavior
} = require('@discordjs/voice')
const { ButtonStyle,
	ButtonBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder
} = require('discord.js')
const ytdl = require('ytdl-core')
const wait = require('util').promisify(setTimeout)
const getResource = require('../../../util/getYoutubeResource')

const controlButtons = {
	stop: new ButtonBuilder()
		.setCustomId(JSON.stringify({ behavior: 'stop' }))
		.setStyle(ButtonStyle.Danger)
		.setLabel('再生停止')
		.setEmoji('⏹'),
	pause: new ButtonBuilder()
		.setCustomId(JSON.stringify({ behavior: 'pause' }))
		.setStyle(ButtonStyle.Primary)
		.setLabel('一時停止')
		.setEmoji('⏸'),
	play: new ButtonBuilder()
		.setCustomId(JSON.stringify({ behavior: 'play' }))
		.setStyle(ButtonStyle.Success)
		.setLabel('再生')
		.setEmoji('▶'),
}

const getVolumeMenu = () => {
	const selectMenu = new StringSelectMenuBuilder()
		.setCustomId(JSON.stringify({ behavior: 'volume' }))
		.setPlaceholder('音量を選択...')

	const volumes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].reverse()
	volumes.forEach(i => {
		selectMenu
			.addOptions({
				label: `${i * 100}%`,
				value: `${i}`,
			})
	})
	return selectMenu
}

module.exports.execute = async interaction => {
	await interaction.deferReply({ ephemeral: interaction.options.getString('messagetype') === 'message' ? false : true })
	const playAudioUrl = interaction.options.getString('url')
	let isLoop = interaction.options.getString('loop') === 'true' ? true : false
	const member = interaction.member
	const channel = member.voice.channel

	if (!channel) {
		interaction.editReply({
			content: '接続先のボイスチャンネルが見つかりません。',
			ephemeral: true,
		})
		return
	}
	const connection = joinVoiceChannel({
		adapterCreator: channel.guild.voiceAdapterCreator,
		channelId: channel.id,
		guildId: channel.guild.id,
		selfDeaf: true,
		selfMute: false,
	})
	const player = createAudioPlayer({
		behaviors: {
			noSubscriber: NoSubscriberBehavior.Pause,
		},
	})
	const connectionSubscribe = connection.subscribe(player)

	const resource = getResource(ytdl.getURLVideoID(playAudioUrl))

	player.play(resource)

	player.on(AudioPlayerStatus.Idle, async () => {
		await wait(1000)
		player.stop()
		if (isLoop == true) {
			const resource = getResource(ytdl.getURLVideoID(playAudioUrl))
			player.play(resource)
			return
		}
		interaction.editReply({ content: `${playAudioUrl}を再生停止しました\nコマンドのサジェスト: </playmusic youtube:1063729380888682547>,</playmusic youtubeplaylist:1063729380888682547>`, ephemeral: true, components: [] })
		connectionSubscribe.unsubscribe()
		connection.destroy()
	})

	const message = await interaction.editReply({
		content: `${playAudioUrl} を再生中`,
		ephemeral: true,
		components: [
			new ActionRowBuilder()
				.addComponents(controlButtons.stop, controlButtons.pause),
			new ActionRowBuilder()
				.addComponents(getVolumeMenu())
		]
	})

	const collector = await message.createMessageComponentCollector({ time: 12 * 60 * 60 * 1000 /*12時間*/ })

	collector.on('collect', collectorInteraction => {
		const interactionData = JSON.parse(collectorInteraction.customId)
		try {
			switch (interactionData.behavior) {
				case 'stop':
					isLoop = false
					player.stop()
					connectionSubscribe.unsubscribe()
					connection.destroy()
					collectorInteraction.update({
						content: `${playAudioUrl} を停止しました\nコマンドのサジェスト:  </playmusic youtube:1063729380888682547>,</playmusic youtubeplaylist:1063729380888682547>`,
						ephemeral: true,
						components: []
					})
					break
				case 'pause':
					player.pause()
					collectorInteraction.update({
						content: `${playAudioUrl} を一時停止中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.play)
						]
					})
					break
				case 'play':
					player.unpause()
					collectorInteraction.update({
						content: `${playAudioUrl} を再生中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.pause)
						]
					})
					break
				case 'volume': {
					const volume = Number(collectorInteraction.values[0])
					resource.volume.setVolume(volume)
					collectorInteraction.update({
						content: `${playAudioUrl} を再生中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.pause),
							new ActionRowBuilder()
								.addComponents(getVolumeMenu())
						]
					})
					break
				}
				default:
					break
			}
		} catch (e) {
			collectorInteraction.reply({
				content: 'エラーが発生しました' + e,
				ephemeral: true
			})
		}
	})
}
