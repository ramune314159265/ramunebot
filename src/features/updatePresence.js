const { ActivityType } = require("discord.js");
const { client } = require("..");

const updatePresence = () => {
    console.log(Date.now())
    client.user.setActivity(`コマンド | ${client.ws.ping}ms`, { type: ActivityType.Playing })
}

setInterval(updatePresence, 5 * 60 * 1000)
updatePresence()