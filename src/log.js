const chalk = require('chalk')

const log = {
	info(text){
		console.log(chalk.bold.bgBlue.rgb(255,255,255)(`\n [gvsdk] info -> `), chalk.underline(`${text} \n`))
	},
	success(text){
		console.log(chalk.bold.bgGreen(`\n [gvsdk] -> `), chalk.white(`${text} \n`))
	},
	error(text){
		console.log(chalk.bold.bgRed(`\n [gvsdk] error -> `), chalk.white(`\n\n ${text} \n`))
	}
}

module.exports = log