const { ActivityType, Status } = require("discord.js");
const { client } = require("..");
const { randomFromArray } = require("../util/random")

const presenceMessages = ['スラッシュコマンド', 'ダイス']

const updatePresence = () => {
    client.user.setStatus('online')
    client.user.setActivity(`${randomFromArray(presenceMessages)} | ${client.ws.ping === -1 ? '不明' : client.ws.ping}ms`, { type: ActivityType.Playing })
}

setInterval(updatePresence, 5 * 60 * 1000)
updatePresence()