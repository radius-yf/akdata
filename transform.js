const e = require('./charMaterials.json')
const m = require('./material.json')

const employee = Object.entries(e).flatMap(([_, v]) => [
	{
		name: v.name,
		type: '精英化',
		level: 1,
		value: v.evolveCosts[1] ? v.evolveCosts[1].map(i => ({
			name: m[i.id].name,
			count: i.count
		})) : []
	},
	{
		name: v.name,
		type: '精英化',
		level: 2,
		value: v.evolveCosts[2] ? v.evolveCosts[2].map(i => ({
			name: m[i.id].name,
			count: i.count
		})) : []
	},
	...v.askillCosts.map((item, index) => ({
		name: v.name,
		type: '技能',
		level: index + 1,
		value: item.lvlUpCost ? item.lvlUpCost.map(i => ({
			name: m[i.id].name,
			count: i.count
		})) : []
	})),
	...v.sskillCosts.flatMap((item, index) => item.levelUpCost.map((i, k) => ({
		name: v.name,
		type: (index + 1) + '技能专精',
		level: k + 1,
		value: i.levelUpCost ? i.levelUpCost.map(i => ({
			name: m[i.id].name,
			count: i.count
		})) : []
	})))
]).filter(i => i.value.length !== 0)

console.log('exports.consumptionTable = ' + JSON.stringify(employee, null, '\t'))


const material = Object.values(m).map(i => ({
	name: i.name,
	parent: [],
	children: Object.entries(i.madeof).map(([name, count]) => ({ name, count }))
}))
material.forEach(i => {
	i.parent = material.filter(j => j.children.some(k => k.name === i.name))
		.map(j => ({
			name: j.name,
			count: j.children.find(k => k.name === i.name).count
		}))
})

const nameIndex = Object.assign({}, ...material.map(i => ({
	[i.name]: i
})))

console.log('exports.compositeTable = ' + JSON.stringify(nameIndex, null, '\t'))