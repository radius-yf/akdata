const sharp = require('sharp')

const img = sharp('./item_sprite.png')

for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 6; j++) {
		img.extract({
			top: 60 * i,
			left: 60 * j,
			width: 60,
			height: 60
		}).toFile(`./dist/${i * 6 + j}.png`)
	}
}

