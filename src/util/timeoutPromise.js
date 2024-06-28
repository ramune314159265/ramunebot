const withTimeoutResolve = (promise, timeout, fallback = 'timeout') => {
	const timeoutPromise = new Promise((resolve, reject) =>
		setTimeout(() => resolve(fallback), timeout)
	)
	return Promise.race([
		promise,
		timeoutPromise
	])
}

const withTimeoutReject = (promise, timeout, fallback = 'timeout') => {
	const timeoutPromise = new Promise((resolve, reject) =>
		setTimeout(() => reject(fallback), timeout)
	)
	return Promise.race([
		promise,
		timeoutPromise
	])
}

module.exports.withTimeoutResolve = withTimeoutResolve
module.exports.withTimeoutReject = withTimeoutReject
