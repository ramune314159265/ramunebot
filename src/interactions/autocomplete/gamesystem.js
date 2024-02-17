const { DynamicLoader } = require('bcdice')

module.exports.execute = async interaction => {
	const focusedOption = interaction.options.getFocused(true)
	const loader = new DynamicLoader()
	const choices = loader.listAvailableGameSystems()
		.filter(system => (system.locale === 'ja_jp'))
		.map((system) => {
			return { name: system.name, value: system.id }
		})
		.filter(system => focusedOption.value === '' ? system : system.name.startsWith(focusedOption.value))
		.slice(0, 24)
	await interaction.respond(choices)
}