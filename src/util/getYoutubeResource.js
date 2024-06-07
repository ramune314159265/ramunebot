const { createAudioResource,
	StreamType
} = require('@discordjs/voice')
const { utils, videoInfo, getFormats, getReadableStream } = require('youtube-ext')

/**
 * 動画のAudioResourceを返す
 * @module getYoutubeResource
 * @param {string} videoId -Youtubeの動画ID
 * @returns {AudioResource}
 */
const getResource = async videoId => {
	const info = await videoInfo(videoId)
	const formats = (await getFormats(info.stream))
		.filter((format) => {
			if (!format.url) return false
			if (info.isLive) return utils.isHlsContentURL(format.url) && format.url.endsWith('.m3u8')
			return typeof format.bitrate === 'number'
		})
		.sort((a, b) => Number(b.bitrate) - Number(a.bitrate))
	const format = formats.find((format) => !format.qualityLabel) || formats.sort((a, b) => Number(a.bitrate) - Number(b.bitrate))[0]
	const stream = await getReadableStream(format)
	const resource = createAudioResource(stream, {
		inputType: StreamType.WebmOpus,
		inlineVolume: true,
	})
	return resource
}

module.exports = getResource
