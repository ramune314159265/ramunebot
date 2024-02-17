const {
	Events
} = require('discord.js')
const { createLocalStorage } = require('localstorage-ponyfill')

module.exports.name = Events.VoiceStateUpdate
module.exports.execute = (oldState, newState) => {
	const { client } = require('..')

	const localStorage = createLocalStorage()
	const guildChannelSetting = JSON.parse(localStorage.getItem(oldState.guild?.id ?? newState.guild?.id)) ?? {}
	if (!guildChannelSetting.channelLog) {
		return
	}

	//切断
	if (newState.channelId === null && oldState.channelId !== null) {
		client.channels.cache.get(guildChannelSetting.channelLog).send({
			content: `<@${oldState.member.id}>(@${oldState.member.user.username}) が<#${oldState.channel.id}> から切断しました`,
			allowedMentions: {
				parse: []
			}
		})
		return
	}
	//接続
	if (newState.channelId !== null && oldState.channelId === null) {
		client.channels.cache.get(guildChannelSetting.channelLog).send({
			content: `<@${newState.member.id}>(@${newState.member.user.username}) が<#${newState.channel.id}> に参加しました`,
			allowedMentions: {
				parse: []
			}
		})
		return
	}
	//移動
	if (newState.channelId !== oldState.channelId) {
		client.channels.cache.get(guildChannelSetting.channelLog).send({
			content: `<@${newState.member.id}>(@${newState.member.user.username}) が<#${oldState.channel.id}> から <#${newState.channel.id}> に移動しました`,
			allowedMentions: {
				parse: []
			}
		})
		return
	}
}