const http = require("http");
http.createServer(function (request, response) {
	response.writeHead(200, { "Access-Control-Allow-Origin": "*" });
	response.end('OK');
}).listen(8000);

const { Client,
	GatewayIntentBits,
	Partials,
	InteractionType,
	channelMention,
	roleMention,
	userMention,
	Events,
	ActivityType,
	EmbedBuilder,
	time
} = require('discord.js');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord-api-types/v9');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
	],
	restTimeOffset: 100,
	presence: {
		activities: [{
			type: ActivityType.Playing,
			name: 'コマンド'
		}],
	},
});

const dotenv = require('dotenv');
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN

if (!discordToken) {
	throw new Error('.envのDISCORD_TOKENが設定されていません')
}

const fs = require('fs');
fs.readdirSync('./src/events')
	.filter(file => file.endsWith('.js'))
	.map(file => require(`./events/${file}`))
	.forEach(eventData => {
		client.on(eventData.name, eventData.execute)
	});

process.on('uncaughtException', err => console.error('uncaughtException:', err))

client.login(discordToken)

module.exports.client = client
