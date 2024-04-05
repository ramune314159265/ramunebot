const {
	EmbedBuilder
} = require('discord.js')

const iacharaAuthorization = process.env.IACHARA_AUTHORIZATION

const fetchIacharaData = async (id) => {
	if (!iacharaAuthorization) {
		throw new Error('Authorization is not set')
	}

	const data = await (await fetch(`https://apiv3.iachara.com/v3/charasheet/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + iacharaAuthorization,
			'Content-Type': 'application/json',
		}
	})).json()
	return data
}

const getDB = ({ str, siz }) => {
	const value = str + siz
	switch (true) {
		case (2 <= value || value <= 12):
			return '-1D6'
		case (13 <= value || value <= 16):
			return '-1D4'
		case (17 <= value || value <= 24):
			return '0'
		case (25 <= value || value <= 32):
			return '+1D4'
		case (33 <= value || value <= 40):
			return '+1D6'
		default:
			return '?'
	}
}

const getIacharaEmbed = async (id) => {
	const fetchedData = await fetchIacharaData(id)
	console.log(fetchedData)

	if (!fetchedData.success) {
		return
	}
	const characterData = fetchedData.data.data
	const embed = new EmbedBuilder()
		.setAuthor({
			name: 'いあきゃら',
			iconURL: 'https://iachara.com/img/favicon.ico'
		})
		.setTitle(`${characterData.profile.name} (${characterData.profile.age}歳)`)
		.setDescription(`
職業…${characterData.profile.profession}
身長…${characterData.profile.height}　体重…${characterData.profile.weight}
性別…${characterData.profile.sex}
出身…${characterData.profile.from}
髪…${characterData.profile.hairColor}　瞳…${characterData.profile.eyeColor}　肌…${characterData.profile.skinColor}

**能力値**
\`STR\`…**${String(characterData.abilities.str.value).padStart(' ')}**　\`CON\`…**${String(characterData.abilities.con.value).padStart(' ')}**　\`POW\`…**${String(characterData.abilities.pow.value).padStart(' ')}**　\`DEX\`…**${String(characterData.abilities.dex.value).padStart(' ')}**
\`APP\`…**${String(characterData.abilities.app.value).padStart(' ')}**　\`SIZ\`…**${String(characterData.abilities.siz.value).padStart(' ')}**　\`INT\`…**${String(characterData.abilities.int.value).padStart(' ')}**　\`EDU\`…**${String(characterData.abilities.edu.value).padStart(' ')}**

\`SAN\`…**${characterData.abilities.sanCurrent}**(不定領域**${characterData.abilities.sanCurrent - Math.ceil(characterData.abilities.sanCurrent / 5)}**)　\`HP\`…**${Math.ceil((characterData.abilities.con.value + characterData.abilities.siz.value) / 2)}**　\`MP\`…**${characterData.abilities.pow.value}**
\`DB\`…**${getDB({ siz: characterData.abilities.siz.value, str: characterData.abilities.str.value })}**　\`アイデア\`…**${characterData.abilities.int.value * 5}**　\`幸運\`…**${characterData.abilities.pow.value * 5}**　\`知識\`…**${characterData.abilities.edu.value * 5}**
`.trim()
		)
		.setURL(`https://iachara.com/view/${id}`)
		.setColor('#1eff02')
		.setThumbnail(characterData.profile.icons[0].url)

	return embed
}

module.exports.fetchIacharaData = fetchIacharaData
module.exports.getIacharaEmbed = getIacharaEmbed
