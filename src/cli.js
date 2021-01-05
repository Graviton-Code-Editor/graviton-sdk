#!/usr/bin/env node

const { program } = require("commander")
const path = require('path');
const log = require('./log')

const { Bundler } = require('../bin/index.js')

program
	.option('-p, --project <value>', 'Project path')
	.option('-t, --target <value>', 'Target type')
	.option('-m, --mode <value>', 'Mode')
	.option('-pm, --platform <value>', 'Webpack target')
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
	const webpackTarget = program.platform || 'node'

	if( target && projectPath ){
		switch(mode){
			case 'release':
				let anyError = true
				const release = new Bundler({
					projectPath,
					webpackTarget
				})
				await release.bundle().then((err)=>{
					if(err){
						log.error(err)
						anyError = false
					}
				})
				await release.copyAssets()
				await release.zip() // Compress it in a ZIP file
				await release.zip('gvp') // Compress it in a GVP file
				if(anyError) log.success(`Plugin "${release.packageConf.name}" built in: \n
  ↳ ${release.releasePath}.zip
  ↳ ${release.releasePath}.gvp
				`)
				break;
			case 'dev':
				const dev = new Bundler({
					projectPath,
					webpackTarget
				})
				let lastError = null
				dev.watch((err) => {
					if(err){
						log.error(err)
						lastError = err
					}else if(lastError){
						log.info(`Any error.`)
						lastError = null
					}
				}).then(() => {
					log.info(`Started watching for changes.`)
				})
				break;
		}
	}
})()


