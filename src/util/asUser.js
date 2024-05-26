const { MessageCreateOptions, TextBasedChannel, GuildMember } = require('discord.js')

const cacheWebhooks = new Map()

const getWebhookInChannel = async channel => {
	const webhook = cacheWebhooks.get(channel.id) ?? await getWebhook(channel)
	return webhook
}

const getWebhook = async (channel) => {
	const webhooks = await channel.fetchWebhooks()
	const canUseWebhook = webhooks?.find(v => v.token) ?? await channel.createWebhook({
		name: channel.client.user.displayName ?? 'Bot',
		reason: 'send as user'
	})
	if (canUseWebhook) cacheWebhooks.set(channel.id, canUseWebhook)

	return canUseWebhook
}

/**
 * webhookを使い別ユーザーに見せかけメッセージを送る
 * @module asUser
 * @param {{ message: MessageCreateOptions, name: string, avatar: string, channel: TextBasedChannel, member: GuildMember }} object - 設定
 */
const sendAsUser = async ({
	message,
	name,
	avatar,
	channel,
	member
}) => {
	const webhook = await await getWebhookInChannel(channel.isThread() ? channel.parent : channel)
	webhook.send({
		...message,
		...(channel.isThread() && {
			threadId: channel.id
		}),
		username: name ?? member.displayName,
		avatarURL: avatar ?? member.displayAvatarURL(),
	})
}

module.exports.sendAsUser = sendAsUser
