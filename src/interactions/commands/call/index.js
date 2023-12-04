const {
  userMention,
} = require('discord.js');

module.exports = {
  data: {
    name: "call",
    description: "通話に招待します",
  },
  async execute(interaction) {
    if (interaction.guildId != '930376081196875787') await interaction.reply({ content: 'このコマンドはパーティークラフター専用です', ephemeral: true })
    const message = await interaction.guild.systemChannel
      .send(`<@&1034812075635126332> ${userMention(interaction.user.id)}が https://discord.com/channels/930376081196875787/930819830821556294 に招待しています`)
    await interaction.reply({ content: '招待を送信します', ephemeral: true });
    await message.react('982830355222515742')
  }
}