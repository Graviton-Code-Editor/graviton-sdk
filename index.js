#!/usr/bin/env node

const { program } = require("commander")
const Bundler = require('parcel-bundler');
const path = require('path');
const { zip } = require('zip-a-folder');
const fs = require('fs-extra')

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

function bundleParcel(entryProject){
	entryProject = path.join(process.cwd(),entryProject)
	return new Promise(async(resolve,reject)=>{
		let error = false
		try {
			const entryPackage = require(entryProject)
			} catch(data){
				error = true
			}
		if( error ) {
			console.error(error)
			return
		}
		const entryPackage = require(entryProject)
		const entryFolder = path.dirname(entryProject)
		const entryDir =  path.resolve(__dirname,entryFolder)
		const entryFile = path.join(entryDir,entryPackage.mainDev)
		const dirFolder = path.join(entryDir,'dist')
		const cacheFolder = path.join(entryFolder,'.cache')
		const bundler = new Bundler(entryFile, {
			outDir: dirFolder, // The out directory to put the build files in, defaults to dist
			cache: true, // Enabled or disables caching, defaults to true
			watch:false,
			cacheDir: cacheFolder, // The directory cache gets put in, defaults to .cache
			contentHash: false, // Disable content hash from being included on the filename
			minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
			target: 'electron', // Browser/node/electron, defaults to browser
			bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
			sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
			detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
		})
		bundler.bundle();
		bundler.on('bundled',()=>{
			setTimeout(()=>{
				resolve({
					entryPackage,
					entryDir,
					entryFile,
					dirFolder
				})
			},4000)
		})
	})
}


function watchParcel(entryProject){
	console.log(__dirname,process.cwd())
	entryProject = path.join(process.cwd(),entryProject)
	const entryPackage = require(entryProject)
	const entryFolder = path.dirname(entryProject)
	const entryDir =  path.resolve(__dirname,entryFolder)
	const entryFile = path.join(entryDir,entryPackage.mainDev)
	const dirFolder = path.join(entryDir,'dist')
	const cacheFolder = path.join(entryFolder,'.cache')
	const bundler = new Bundler(entryFile, {
		outDir: dirFolder, 
		cache: true, 
		watch:true,
		cacheDir: cacheFolder, 
		minify: true, 
		target: 'electron', 
		bundleNodeModules: true,
		sourceMaps: true, 
		detailedReport: true
	})
	console.log(`Graviton:: Started watching.`)
	bundler.bundle();
}

function copyPackageToDist({
	entryProject,
	dirFolder
}){
	return new Promise((resolve,reject)=>{
		const dirProject = path.join(dirFolder,'package.json')
		fs.copyFile(entryProject, dirProject, (err) => {
			if (err) throw err;
			resolve()
		});
	})
}

function bundleZip({
	entryDir,
	dirFolder,
	entryPackage
}){
	return new Promise(async (resolve,reject)=>{
		const buildFolder = path.join(entryDir,'build')
		if( !fs.existsSync(buildFolder) ) fs.mkdirSync(buildFolder)
		const buildDir = path.join(buildFolder,`${entryPackage.name}.zip`)
		await zip(dirFolder, buildDir);
		resolve({
			buildDir
		})
	})
}

(async()=> {
	const target = validateTarget(program.target)
	const mode = validateMode(program.mode)
	if( target && program.entry ){
		switch(mode){
			case 'release':
				let { dirFolder, entryDir, entryPackage } = await bundleParcel(program.entry)
				await copyPackageToDist({
					entryProject:program.entry,
					dirFolder
				})
				let { buildDir } = await bundleZip({
					entryDir,
					dirFolder,
					entryPackage
				})
				console.log(`\n Graviton:: ${entryPackage.name} built in ${buildDir} \n`)
				break;
			case 'dev':
				await watchParcel(program.entry)
				break;
		}
	}
})()
