#!/usr/bin/env node

const { program } = require("commander")
const path = require('path');
const log = require('./log')

const { bundleSource, watchParcel, copyPackageToDist, bundleZip } = require('../index.js')

program
	.option('-e, --entry <value>', 'Entry file')
	.option('-t, --target <value>', 'Target type')
	.option('-m, --mode <value>', 'Mode')
;

program.parse(process.argv);


function validateTarget( target ){
	switch( target ){
		case 'plugin':
			return 'plugin'
		case 'iconpack':
			return 'iconpack'
		case 'theme':
			return 'theme'
		default:
			return false
	}
}

function validateMode( mode ){
	switch( mode ){
		case 'release':
			return 'release'
		case 'dev':
		default:
			return 'dev'
	}
}

(async () => {
	const target = validateTarget(program.target)
	const mode = validateMode(program.mode)
	const entryProject = path.join(process.cwd(),program.entry)
	if( target && program.entry ){
		switch(mode){
			case 'release':
				let { dirFolder, entryDir, entryPackage } = await bundleSource({
					entryProject
				})
				await copyPackageToDist({
					entryProject,
					dirFolder
				})
				let { buildDir } = await bundleZip({
					entryDir,
					dirFolder,
					entryPackage
				})
				log.success(`Plugin "${entryPackage.name}" built in ${buildDir}`)
				break;
			case 'dev':
				watchParcel({
					entryProject
				})
				break;
		}
	}
})()


