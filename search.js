const data = require('./result')

const d = data.default.map(i => ({
	...i,
	upgradeConsumption: i.upgradeConsumption.filter(j => j.value.some(k => k.name === '轻锰矿'))
})).filter(i => i.upgradeConsumption.length !== 0)

const total = d.flatMap(i => i.upgradeConsumption.flatMap(i => i.value.filter(i => i.name === '轻锰矿').map(i => i.count))).reduce((p, i) => p + i, 0)

console.log(total)