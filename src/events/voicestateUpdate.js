const {
    Events
} = require('discord.js');

const { client } = require('..')

module.exports.name = Events.VoiceStateUpdate
module.exports.execute = (oldState, newState) => {
    if (!(newState.guild.id === '930376081196875787')) {
        return
    }
    if (newState.channelId === null && oldState.channelId !== null) {
        //ここはdisconnectしたときに発火する場所
        return client.channels.cache.get('1089033872873893918').send({
            content: `<@${oldState.member.id}>(@${oldState.member.user.username}) が<#${oldState.channel.id}> から切断しました`,
            allowedMentions: {
                parse: []
            }
        })
    }
    if (newState.channelId !== null && oldState.channelId === null) {
        //ここはconnectしたときに発火する場所
        return client.channels.cache.get('1089033872873893918').send({
            content: `<@${newState.member.id}>(@${newState.member.user.username}) が<#${newState.channel.id}> に参加しました`,
            allowedMentions: {
                parse: []
            }
        })
    }
    if (newState.channelId !== oldState.channelId) {
        //ここは移動したときに発火する場所
        return client.channels.cache.get('1089033872873893918').send({
            content: `<@${newState.member.id}>(@${newState.member.user.username}) が<#${oldState.channel.id}> から <#${newState.channel.id}> に移動しました`,
            allowedMentions: {
                parse: []
            }
        })
    }
}