const { ActivityType, Status } = require("discord.js");
const { client } = require("..");
const { randomFromArray } = require("../util/random")

const presenceMessages = ['スラッシュコマンド', 'ダイス']

const updatePresence = () => {
    client.user.setStatus('online')
    client.user.setActivity(`${client.ws.ping === -1 ? '不明' : client.ws.ping}ms` | ${randomFromArray(presenceMessages)}, { type: ActivityType.Playing })
}

setInterval(updatePresence, 5 * 60 * 1000)
updatePresence()