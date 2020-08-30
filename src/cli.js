#!/usr/bin/env node

const { program } = require("commander")
const path = require('path');
const log = require('./log')

const { Bundler } = require('../bin/index.js')

program
	.option('-p, --project <value>', 'Project path')
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
	const projectPath = path.join(process.cwd(), program.project)
	if( target && projectPath ){
		switch(mode){
			case 'release':
				const release = new Bundler({
					projectPath
				})
				await release.bundle()
				await release.copyAssets()
				await release.zip()
				log.success(`Plugin "${release.packageConf.name}" built in ${release.releasePath}`)
				break;
			case 'dev':
				const dev = new Bundler({
					projectPath
				})
				dev.watch((err) => {
					if(err){
						log.error(err)
					}
				}).then(() => {
					log.info(`Started watching for changes.`)
				})
				break;
		}
	}
})()


