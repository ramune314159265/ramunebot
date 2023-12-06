const http = require("http");
http.createServer(function (request, response) {
	response.writeHead(200, { "Access-Control-Allow-Origin": "*" });
	response.end('OK');
}).listen(8000);

const { Client,
	GatewayIntentBits,
	Partials,
	ActivityType,
} = require('discord.js');
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

fs.readdirSync('./src/features')
	.filter(file => file.endsWith('.js'))
	.forEach(file => require(`./events/${file}`))

process.on('uncaughtException', err => console.error('uncaughtException:', err))

client.login(discordToken)

module.exports.client = client
