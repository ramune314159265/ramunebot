const { createAudioResource,
	StreamType
} = require('@discordjs/voice')
const ytdl = require('@distube/ytdl-core')

/**
 * 動画のAudioResourceを返す
 * @module getYoutubeResource
 * @param {string} videoId -Youtubeの動画ID
 * @returns {AudioResource}
 */
const getResource = videoId => {
	const stream = ytdl(videoId, {
		filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
		highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
		quality: 'lowestaudio',
		requestOptions: {
			headers: {
				...(process.env.YT_COOKIE && {
					cookie: process.env.YT_COOKIE
				})
			}
		}
	})
	const resource = createAudioResource(stream, {
		inputType: StreamType.WebmOpus,
		inlineVolume: true,
	})
	return resource
}

module.exports = getResource
