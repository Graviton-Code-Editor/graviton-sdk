const path = require('path')

module.exports = {
	mode: 'production',
	entry:{
		index:  path.join(__dirname, 'src/index.ts')
	},
	output:{
		path: path.join(__dirname, 'bin')
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader'
			}
		]
	},
	target: 'node',
	node: {
		fs: 'empty'
	}
}