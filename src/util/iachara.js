const {
	EmbedBuilder
} = require('discord.js')

const fetchIacharaData = async (id) => {
	const token = (await (await fetch(`https://securetoken.googleapis.com/v1/token?key=AIzaSyBRP4ntIWd48qx6Liqk-1DnigSMM_xNLgs`, {
		method: 'POST',
		body: 'grant_type=refresh_token&refresh_token=AMf-vBw-qCFR_9hDuWzm6p_ozE_1CBrH2B9JcXMvJ5LedWKv6K_w8KD7SWIDedNcCgsDINM8PcR-EEC987cqyVJ4lTydd2kkyI7G8-7K0-KEuQUvwiYd4r3eddYh2Mb1vbxKE5y_-M2J',
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		}
	})).json()).access_token

	const data = await (await fetch(`https://apiv3.iachara.com/v3/charasheet/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
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

const parseIacharaData = (characterData) => {
	const name = characterData.profile.name
	const age = characterData.profile.age
	const profession = characterData.profile.profession
	const height = characterData.profile.height
	const weight = characterData.profile.weight
	const sex = characterData.profile.sex
	const form = characterData.profile.from
	const hairColor = characterData.profile.hairColor
	const eyeColor = characterData.profile.eyeColor
	const skinColor = characterData.profile.skinColor

	const str = characterData.abilities.str.value
	const con = characterData.abilities.con.value
	const pow = characterData.abilities.pow.value
	const dex = characterData.abilities.dex.value
	const app = characterData.abilities.app.value
	const siz = characterData.abilities.siz.value
	const int = characterData.abilities.int.value
	const edu = characterData.abilities.edu.value
	const san = characterData.abilities.sanCurrent
	const sanIndeterminate = san - Math.ceil(san / 5)
	const hp = Math.ceil((con + siz) / 2)
	const mp = pow
	const db = getDB({ siz, str })
	const idea = characterData.abilities.int.value * 5
	const luck = characterData.abilities.pow.value * 5
	const knowledge = characterData.abilities.edu.value * 5
	const modifiedSkills = [...characterData.battleSkills.static, ...characterData.searchSkills.static, ...characterData.actionSkills.static, ...characterData.negotiationSkills.static, ...characterData.knowledgeSkills.static]
		.filter(skill => (skill.otherPoint + skill.growthPoint + skill.interestPoint + skill.professionPoint) !== 0)
		.map(skill => {
			const defaultSkillPoints = {
				'回避': dex * 2
			}
			const defaultPoint = skill.defaultPoint ?? defaultSkillPoints[skill.name] ?? 0
			return {
				...skill,
				defaultPoint,
				name: `${skill.name}${skill.additionalName ?? ''}`,
				addedPoint: skill.otherPoint + skill.growthPoint + skill.interestPoint + skill.professionPoint,
				totalPoint: skill.otherPoint + skill.growthPoint + skill.interestPoint + skill.professionPoint + defaultPoint
			}
		})
	const debtMoney = characterData.money.debtMoney
	const pocketMoney = characterData.money.pocketMoney
	const belongings = characterData.money.belongings
	const battleEquipments = characterData.battle
	const memo = characterData.memo

	return {
		name,
		age: age ?? '?',
		profession: profession ?? '?',
		height: height ?? '0',
		weight: weight ?? '0',
		sex: sex ?? '?',
		form: form ?? '?',
		hairColor: hairColor ?? '?',
		eyeColor: eyeColor ?? '?',
		skinColor: skinColor ?? '?',
		str,
		con,
		pow,
		dex,
		app,
		siz,
		int,
		edu,
		san,
		sanIndeterminate,
		hp,
		mp,
		db,
		idea,
		luck,
		knowledge,
		modifiedSkills,
		memo,
		debtMoney,
		belongings,
		battleEquipments,
		pocketMoney
	}
}

const getIacharaEmbed = async (id) => {
	const fetchedData = await fetchIacharaData(id)
	if (!fetchedData.success) {
		return
	}
	const characterData = fetchedData.data.data

	const {
		name, age, profession, height, weight, sex, form, hairColor, eyeColor, skinColor,
		str, con, pow, dex, app, siz, int, edu, san,
		sanIndeterminate, hp, mp, db, idea, luck, knowledge,
		modifiedSkills,
		debtMoney, pocketMoney, belongings, battleEquipments,
		memo,
	} = parseIacharaData(characterData)
	const embed = new EmbedBuilder()
		.setAuthor({
			name: 'いあきゃら',
			iconURL: 'https://iachara.com/img/favicon.ico'
		})
		.setTitle(`${name} (${age}歳)`)
		.setDescription(`
職業…${profession}
身長…${height}　体重…${weight}
性別…${sex}
出身…${form}
髪…${hairColor}　瞳…${eyeColor}　肌…${skinColor}

**能力値**
\`STR\`…**${String(str).padStart(' ')}**　\`CON\`…**${String(con).padStart(' ')}**　\`POW\`…**${String(pow).padStart(' ')}**　\`DEX\`…**${String(dex).padStart(' ')}**
\`APP\`…**${String(app).padStart(' ')}**　\`SIZ\`…**${String(siz).padStart(' ')}**　\`INT\`…**${String(int).padStart(' ')}**　\`EDU\`…**${String(edu).padStart(' ')}**

\`SAN\`…**${san}**(不定領域**${sanIndeterminate}**)　\`HP\`…**${hp}**　\`MP\`…**${mp}**
\`DB\`…**${db}**　\`アイデア\`…**${idea}**　\`幸運\`…**${luck}**　\`知識\`…**${knowledge}**

**技能値**
技能名　　　　　追加 合計
━━━━━━━━━━━━━━━━━━━━━━
${modifiedSkills.map(skill => `${skill.name.padEnd(7, '　')}　${String(skill.addedPoint).padStart(2, '0')}　 **${String(skill.totalPoint).padStart(2, '0')}**`).join('\n')}

**お金**
所持金…**${pocketMoney}**円　借金…**${debtMoney}**円

**戦闘 武器 防具**
${battleEquipments.map(equipment => `${equipment.name}…射程**${equipment.range}**m　**${equipment.damage}**ダメージ　${equipment.detail}`).join('\n')}

**所持物**
${belongings.map(belonging => `${belonging.name}…**${belonging.quantity}**個　**${belonging.price}**円　${belonging.detail}`).join('\n')}

**メモ**
${memo}
`.trim()
		)
		.setURL(`https://iachara.com/view/${id}`)
		.setColor('#1eff02')
		.setThumbnail(characterData.profile.icons[0].url)

	return embed
}

module.exports.fetchIacharaData = fetchIacharaData
module.exports.getIacharaEmbed = getIacharaEmbed
