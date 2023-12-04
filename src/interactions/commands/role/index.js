const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType, EmbedBuilder, roleMention } = require('discord.js');
const { json } = require('express');
module.exports = {
    data: {
        name: "role",
        description: "ロールを選択して付けたり外したりします",
    },
    async execute(interaction) {
        const roles = {}
        const roleCollections = await interaction.guild.roles.fetch()
        const roleList = Array.from(roleCollections)
        const SelectableRoles = roleList.filter(role => role[1].name.includes(':')).map(role => role[1])
        SelectableRoles.forEach(role => {
            if (roles[role.name.split(':')[0]] === undefined) roles[role.name.split(':')[0]] = new Array()
            roles[role.name.split(':')[0]].push({ name: role.name.split(':')[1], id: role.id })
        })
        const ActionRows = []
        for (const [key, value] of Object.entries(roles)) {
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(JSON.stringify({ type: 'role', group: key }))
                .setPlaceholder(`${key}ロール`)
            value.forEach(name => {
                selectMenu.addOptions({
                    label: name.name,
                    description: `${key}ロールの${name.name}`,
                    value: name.id,
                })
            })
            ActionRows.push(
                new ActionRowBuilder()
                    .addComponents(selectMenu)
            )
        }
        const msg = await interaction.reply({
            content: `下からロールを選択してください\nすでに持っているロールを選択するとそのロールが外されます`,
            components: ActionRows,
            ephemeral: true,
            embeds: [
                new EmbedBuilder()
                    .setColor('#58b058')
                    .setTitle('追加したロール')
                    .setDescription(`:arrow_right: `),
                new EmbedBuilder()
                    .setColor('#58b058')
                    .setTitle('はずしたロール')
                    .setDescription(`:arrow_right: `)
            ]
        })
        const collector = await msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 5 * 60 * 1000 /*5分*/ });
        collector.on('collect', selectMenuInteraction => {
            const id = JSON.parse(selectMenuInteraction.customId)
            if (!id.type === 'role') return
            const doInfo = { added: new Array(), removed: new Array() }
            const member = selectMenuInteraction.member
            selectMenuInteraction.values.forEach(async value => {
                const hasRoles = member.roles.cache.some(role => role.id === value)
                if (hasRoles) {
                    doInfo.removed.push(new String(value))
                    await member.roles.remove(value)
                } else {
                    doInfo.added.push(new String(value))
                    await member.roles.add(value)
                }
            })
            const addedEmbed = new EmbedBuilder()
                .setColor('#58b058')
                .setTitle('追加したロール')
                .setDescription(`:arrow_right: ${doInfo.added.map(e => roleMention(e)).join(' ,')}`)
            const removedEmbed = new EmbedBuilder()
                .setColor('#58b058')
                .setTitle('はずしたロール')
                .setDescription(`:arrow_right: ${doInfo.removed.map(e => roleMention(e)).join(' ,')}`)
            selectMenuInteraction.update({
                embeds: [addedEmbed, removedEmbed],
                components: ActionRows,
                ephemeral: true
            })
        })
    }
}