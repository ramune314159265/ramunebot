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

module.exports.fetchIacharaData = fetchIacharaData
