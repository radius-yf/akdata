const e = require('./charMaterials.json')
const m = require('./material.json')

const employee = Object.entries(e).map(([_, v]) => ({
	name: v.name,
	upgradeConsumption: [
		{
			type: '精英化',
			level: 1,
			value: v.evolveCosts[1] ? v.evolveCosts[1].map(i => ({
				name: m[i.id].name,
				count: i.count
			})) : []
		},
		{
			type: '精英化',
			level: 2,
			value: v.evolveCosts[2] ? v.evolveCosts[2].map(i => ({
				name: m[i.id].name,
				count: i.count
			})) : []
		},
		...v.askillCosts.map((item, index) => ({
			type: '技能',
			level: index + 1,
			value: item.lvlUpCost ? item.lvlUpCost.map(i => ({
				name: m[i.id].name,
				count: i.count
			})) : []
		})),
		...v.sskillCosts.flatMap((item, index) => item.levelUpCost.map((i, k) => ({
			type: (index + 1) + '技能专精',
			level: k + 1,
			value: i.levelUpCost ? i.levelUpCost.map(i => ({
				name: m[i.id].name,
				count: i.count
			})) : []
		})))
	].filter(i => i.value.length !== 0)
})).filter(i => i.upgradeConsumption.length !== 0)

console.log('export default ' + JSON.stringify(employee, null, '\t'))