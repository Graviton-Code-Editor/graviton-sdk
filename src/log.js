const chalk = require('chalk')

const log = {
	info(text){
		console.log(chalk.bold.bgBlue.rgb(255,255,255)(`\n [gvsdk] -> `), chalk.underline(`${text} \n`))
	},
	success(text){
		console.log(chalk.bold.bgGreen(`\n [gvsdk] -> `), chalk.underline(`${text} \n`))
	},
	error(text){
		console.log(chalk.bold.bgRed(`\n [gvsdk] -> `), chalk.underline(`${text} \n`))
	}
}

module.exports = log