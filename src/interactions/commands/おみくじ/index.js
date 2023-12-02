const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType, NoSubscriberBehavior, AudioPlayer } = require('@discordjs/voice');
const { Discord, ButtonStyle, ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const wait = require('util').promisify(setTimeout);
module.exports = {
    data: {
        name: "おみくじ",
        description: "おみくじを引きます(完全ランダム)",
    },
    async execute(interaction) {
        const list = ["大吉", "吉", "中吉", "小吉", "末吉", "凶", "大凶"];
        const result = Math.floor(Math.random() * list.length);
        await interaction.reply({ content: list[result], ephemeral: true })
    }
}