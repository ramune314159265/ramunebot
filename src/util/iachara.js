const {
	EmbedBuilder
} = require('discord.js')

const fetchIacharaData = async (id) => {
	return new Promise((resolve) => resolve(JSON.parse(`{
		"success": true,
		"data": {
			"id": 8419524,
			"icon": [],
			"name": "ラムネ",
			"data": {
				"memo": "らるの派生系",
				"money": {
					"debtMoney": "0",
					"belongings": [
						{
							"id": "c0718118-8e84-4aee-8b57-734e157a3b92",
							"name": "拳銃",
							"price": "20000",
							"detail": "そこそこですね",
							"quantity": "1",
							"unitPrice": "20000"
						}
					],
					"pocketMoney": "30000"
				},
				"battle": [
					{
						"id": "8f24b5c6-8b70-4c77-8606-380552200042",
						"name": "拳銃",
						"time": "1",
						"range": "50",
						"damage": "3d6",
						"detail": "",
						"failure": "弾切れ",
						"endurance": "10",
						"ammoAmount": "5",
						"probability": ""
					}
				],
				"spells": [],
				"fellows": [],
				"profile": {
					"age": "15",
					"sex": "男",
					"tag": "",
					"from": "愛知　半田市",
					"furi": "",
					"name": "ラムネ",
					"icons": [
						{
							"id": "",
							"url": "https://image.iaproject.app/7b86ad8d-0c14-4994-8df2-d075d268cea1",
							"name": "これはよねず",
							"externalData": {}
						}
					],
					"height": "193",
					"isLost": false,
					"weight": "35",
					"eyeColor": "黒",
					"hairColor": "茶色",
					"skinColor": "橙",
					"profession": "エンジニア",
					"themeColor": "",
					"externalData": {},
					"externalProfiles": [],
					"isLostDisableImg": false
				},
				"version": "6th",
				"metadata": {
					"created": "2024-03-17T05:39:25.788Z",
					"authorId": "unknown",
					"isPublic": true,
					"isDeleted": false,
					"isCopyable": false,
					"lastUpdated": "2024-03-17T05:39:25.788Z"
				},
				"abilities": {
					"hp": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"mp": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"app": {
						"value": 11,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"con": {
						"value": 12,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"dex": {
						"value": 11,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"edu": {
						"value": 14,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"ide": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"int": {
						"value": 10,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"pow": {
						"value": 13,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"san": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"siz": {
						"value": 11,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"str": {
						"value": 15,
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"know": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"luck": {
						"fixedDiff": 0,
						"tmpFixedDiff": 0
					},
					"userDB": "",
					"sanCurrent": 65
				},
				"artifacts": [],
				"skillPoint": {
					"interestPoint": 0,
					"professionPoint": 0,
					"fixInterestPoint": 0,
					"fixProfessionPoint": 0,
					"professionPointCalcType": 0
				},
				"jsonVersion": "0.0.0",
				"actionSkills": {
					"static": [
						{
							"name": "運転",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 20,
							"interestPoint": 0,
							"additionalName": "",
							"professionPoint": 0
						},
						{
							"name": "機械修理",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 20,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "重機械操作",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "乗馬",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "水泳",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "製作",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"additionalName": "パソコン",
							"professionPoint": 30
						},
						{
							"name": "操縦",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"additionalName": "",
							"professionPoint": 0
						},
						{
							"name": "跳躍",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 15
						},
						{
							"name": "電気修理",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "ナビゲート",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "変装",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 20
						}
					],
					"additional": []
				},
				"battleSkills": {
					"static": [
						{
							"name": "回避",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"interestPoint": 40,
							"professionPoint": 0
						},
						{
							"name": "キック",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "組み付き",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "こぶし（パンチ）",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 50,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "頭突き",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 20,
							"professionPoint": 0
						},
						{
							"name": "投擲",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "マーシャルアーツ",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "拳銃",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 20,
							"interestPoint": 40,
							"professionPoint": 0
						},
						{
							"name": "サブマシンガン",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 15,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "ショットガン",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 30,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "マシンガン",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 15,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "ライフル",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 0
						}
					],
					"additional": []
				},
				"searchSkills": {
					"static": [
						{
							"name": "応急手当",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 30,
							"interestPoint": 0,
							"professionPoint": 10
						},
						{
							"name": "鍵開け",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "隠す",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 15,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "隠れる",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "聞き耳",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 25
						},
						{
							"name": "忍び歩き",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "写真術",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "精神分析",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "追跡",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "登攀",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 40,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "図書館",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 30
						},
						{
							"name": "目星",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 25,
							"interestPoint": 0,
							"professionPoint": 40
						}
					],
					"additional": []
				},
				"knowledgeSkills": {
					"static": [
						{
							"name": "医学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "オカルト",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "化学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "クトゥルフ神話",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 0,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "芸術",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"additionalName": "ラル",
							"professionPoint": 30
						},
						{
							"name": "経理",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "考古学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "コンピューター",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 30
						},
						{
							"name": "心理学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "人類学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "生物学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "地質学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "電子工学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "天文学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "博物学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 10,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "物理学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "法律",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "薬学",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 1,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "歴史",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 20,
							"interestPoint": 0,
							"professionPoint": 0
						}
					],
					"additional": []
				},
				"passedScenarios": [],
				"additionalMemoIds": [],
				"negotiationSkills": {
					"static": [
						{
							"name": "言いくるめ",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 10
						},
						{
							"name": "信用",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 15,
							"interestPoint": 0,
							"professionPoint": 10
						},
						{
							"name": "説得",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 15,
							"interestPoint": 0,
							"professionPoint": 30
						},
						{
							"name": "値切り",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"defaultPoint": 5,
							"interestPoint": 0,
							"professionPoint": 0
						},
						{
							"name": "母国語",
							"isGrow": false,
							"otherPoint": 0,
							"growthPoint": 0,
							"interestPoint": 0,
							"additionalName": "",
							"professionPoint": 0
						}
					],
					"additional": []
				}
			},
			"authorId": "357668",
			"public": true,
			"tag": "",
			"createdAt": "2024-03-17T05:39:24.825Z",
			"updatedAt": "2024-03-17T06:09:09.036Z",
			"deletedAt": null,
			"deleted": false
		}
	}`)))
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
		knowledge
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
		sanIndeterminate, hp, mp, db, idea, luck, knowledge
	} = await parseIacharaData(characterData)
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
`.trim()
		)
		.setURL(`https://iachara.com/view/${id}`)
		.setColor('#1eff02')
		.setThumbnail(characterData.profile.icons[0].url)

	return embed
}

module.exports.fetchIacharaData = fetchIacharaData
module.exports.getIacharaEmbed = getIacharaEmbed
