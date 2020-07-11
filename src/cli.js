#!/usr/bin/env node

const { program } = require("commander")
const Bundler = require('parcel-bundler');
const path = require('path');
const { zip } = require('zip-a-folder');
const fs = require('fs-extra')
const log = require('fancylog')

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
	if( target && program.entry ){
		switch(mode){
			case 'release':
				let { dirFolder, entryDir, entryPackage, pluginType } = await bundleSource({
					entryProject: program.entry
				})
				await copyPackageToDist({
					entryProject: program.entry,
					dirFolder
				})
				let { buildDir } = await bundleZip({
					entryDir,
					dirFolder,
					entryPackage
				})
				log.info(`Graviton SDK -> Plugin "${entryPackage.name}" built in ${buildDir}`)
				break;
			case 'dev':
				await watchParcel({
					entryProject: program.entry
				})
				break;
		}
	}
})()
