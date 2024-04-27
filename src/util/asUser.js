const { MessageCreateOptions, TextBasedChannel } = require('discord.js')

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
 * @param {{ message: MessageCreateOptions, name: string, avatar: string, channel: TextBasedChannel }} object - 設定
 */
const sendAsUser = async ({
	message,
	name,
	avatar,
	channel
}) => {
	const webhook = await await getWebhookInChannel(channel)
	webhook.send({
		...message,
		username: name,
		avatarURL: avatar,
	})
}

module.exports.sendAsUser = sendAsUser
