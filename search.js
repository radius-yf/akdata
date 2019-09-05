const { consumptionTable, compositeTable } = require('./data')

const synthesizable = material => {
	const arr = compositeTable[material].parent.map(i => ({
		name: i.name,
		multiple: i.count
	}))
	return arr.concat(...arr.map(i => synthesizable(i.name).map(({ name, multiple }) => ({
		name,
		multiple: i.multiple * multiple
	}))))
}

const total = m => ({
	name: m.name,
	count: consumptionTable.map(i =>
		i.value.find(item => item.name === m.name)
			? i.value.find(item => item.name === m.name).count
			: 0
	)
		.reduce((p, i) => p + i),
	multiple: m.multiple
})

const input = process.argv[2]
const hechengpin = synthesizable(input)
console.log(`${input}可合成${hechengpin.map(i => i.name).join(',')}`)

console.log('各种材料需求：')
const demands = [{ name: input, multiple: 1 }, ...hechengpin].map(total)
demands.forEach(i => console.log(`${i.name}:${i.count} * ${i.multiple} = ${i.count * i.multiple}`))
console.log(`总计：${demands.reduce((p, i) => p + i.count * i.multiple, 0)}`)