const { AudioPlayerStatus,
	createAudioPlayer,
	joinVoiceChannel,
	NoSubscriberBehavior
} = require('@discordjs/voice')
const { ButtonStyle,
	ButtonBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	EmbedBuilder
} = require('discord.js')
const ytdl = require('ytdl-core')
const wait = require('util').promisify(setTimeout)
const getResource = require('../../../util/getYoutubeResource')
const { withTimeoutResolve } = require('../../../util/timeoutPromise')

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

const getStatusEmbed = ({ audioName, isLoop, volume, status }) => {
	const statuses = {
		playing: '再生中',
		paused: '一時停止中',
		stopped: '再生終了'
	}
	const embed = new EmbedBuilder()
		.setTitle(`${audioName}`)
		.addFields(
			{ name: '音量', value: `${volume * 100}%`, inline: true },
			{ name: 'ループ再生', value: isLoop ? 'オン' : 'オフ', inline: true },
			{ name: 'ステータス', value: statuses[status], inline: true }
		)
		.setAuthor({ name: 'Youtube' })
		.setColor('Red')
		.setTimestamp()
	return embed
}

module.exports.execute = async interaction => {
	await interaction.deferReply({ ephemeral: interaction.options.getString('messagetype') === 'message' ? false : true })
	const playAudioUrl = interaction.options.getString('url')
	if (!ytdl.validateURL(playAudioUrl)) {
		interaction.editReply({
			content: 'URLが正しくありません',
			ephemeral: true,
		})
		return
	}

	const playAudioName = (await withTimeoutResolve(ytdl.getBasicInfo(playAudioUrl), 3000, {}))?.videoDetails?.title ?? '不明'
	let isLoop = interaction.options.getString('loop') === 'true' ? true : false
	let volume = interaction.options.getString('volume') ? Number(interaction.options.getString('volume')) : '0.7'
	let status = 'playing'
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
	resource.volume.setVolume(volume)

	player.play(resource)

	player.on(AudioPlayerStatus.Idle, async () => {
		await wait(1000)
		player.stop()
		status = 'stopped'
		if (isLoop == true) {
			const resource = getResource(ytdl.getURLVideoID(playAudioUrl))
			player.play(resource)
			return
		}
		interaction.editReply({ content: `${playAudioUrl} を再生停止しました\nコマンドのサジェスト: </playmusic youtube:1063729380888682547>,</playmusic youtubeplaylist:1063729380888682547>`, ephemeral: true, components: [], embeds: [] })
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
		],
		embeds: [
			getStatusEmbed({ isLoop, volume, status, audioName: playAudioName })
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
					status = 'stopped'
					connectionSubscribe.unsubscribe()
					connection.destroy()
					collectorInteraction.update({
						content: `${playAudioUrl} を停止しました\nコマンドのサジェスト:  </playmusic youtube:1063729380888682547>,</playmusic youtubeplaylist:1063729380888682547>`,
						ephemeral: true,
						components: [],
						embeds: []
					})
					break
				case 'pause':
					player.pause()
					status = 'paused'
					collectorInteraction.update({
						content: `${playAudioUrl} を一時停止中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.play),
							new ActionRowBuilder()
								.addComponents(getVolumeMenu())
						],
						embeds: [
							getStatusEmbed({ isLoop, volume, status, audioName: playAudioName })
						]
					})
					break
				case 'play':
					player.unpause()
					status = 'playing'
					collectorInteraction.update({
						content: `${playAudioUrl} を再生中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.pause),
							new ActionRowBuilder()
								.addComponents(getVolumeMenu())
						],
						embeds: [
							getStatusEmbed({ isLoop, volume, status, audioName: playAudioName })
						]
					})
					break
				case 'volume': {
					volume = Number(collectorInteraction.values[0])
					resource.volume.setVolume(volume)
					collectorInteraction.update({
						content: `${playAudioUrl} を再生中`,
						ephemeral: true,
						components: [
							new ActionRowBuilder()
								.addComponents(controlButtons.stop, controlButtons.pause),
							new ActionRowBuilder()
								.addComponents(getVolumeMenu())
						],
						embeds: [
							getStatusEmbed({ isLoop, volume, status, audioName: playAudioName })
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
