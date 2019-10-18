const { consumptionTable, compositeTable } = require('./data')

/**
 * 判断升级材料中是否包含某一个材料
 * @param {string} name 材料名
 * @param {object} item 升级信息
 */
const judge = name => item => item.value.some(i => i.name === name)

const total = name => item => item.value.find(item => item.name === name).count

const add = (a, b) => a + b

/**
 * 返回合成材料和数量
 * @param {string} name 材料名
 */
const synthesizable = name => {
	const arr = compositeTable[name].parent.map(i => ({
		name: i.name,
		multiple: i.count
	}))
	return arr.concat(...arr.map(i => synthesizable(i.name).map(({ name, multiple }) => ({
		name,
		multiple: i.multiple * multiple
	}))))
}



const input = process.argv[2]
const hechengpin = synthesizable(input)

// console.log(`${input}可合成：${hechengpin.map(i => i.name).join(',')}`)

// console.log('各种材料需求：')
// const demands = [{ name: input, multiple: 1 }, ...hechengpin].map(i => ({
// 	...i,
// 	count: consumptionTable.filter(judge(i.name))
// 		.map(total(i.name))
// 		.reduce(add)
// }))
// demands.forEach(i => console.log(`${i.name}:${i.count} * ${i.multiple} = ${i.count * i.multiple}`))
// console.log(`总计：${demands.reduce((p, i) => p + i.count * i.multiple, 0)}`)



const toString = i => `${i.name}:${i.type}${i.level}` 
	+ i.value.map(j => `${j.name}:${j.count}`).join(',')

console.log(
	consumptionTable
		.filter(i => i.type === '精英化')
		.filter(judge(input))
		.map(toString)
		.join('\n')
)
