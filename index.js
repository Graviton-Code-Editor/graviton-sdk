const Bundler = require('parcel-bundler');
const path = require('path');
const { zip } = require('zip-a-folder');
const fs = require('fs-extra')
const log = require('fancylog')

function bundleSource({
	entryProject,
	distDir,
	cacheDir
}){
	entryProject = path.join(process.cwd(),entryProject)
	return new Promise(async (resolve,reject) => {
		let error = false
		try {
			const entryPackage = require(entryProject);
		} catch(data){
			error = true
		}
		if( error ) return console.error(error)
		const entryPackage = require(entryProject)
		const pluginType = entryPackage.type || 'plugin'
		const entryFolder = path.dirname(entryProject)
		const entryDir =  path.resolve(__dirname,entryFolder)
		const dirFolder = path.join(entryDir,'dist')
		if ( pluginType == 'plugin' ){
			const entryFile = path.join(entryDir,entryPackage.mainSrc)
			const cacheFolder = path.join(entryFolder,'.cache')
			const bundler = new Bundler(entryFile, {
				outDir: distDir || dirFolder, 
				cache: true, 
				watch: false,
				cacheDir: cacheDir || cacheFolder, 
				contentHash: false,
				minify: true, 
				target: 'node',
				bundleNodeModules: true, 
				sourceMaps: true, 
				detailedReport: false 
			})
			bundler.bundle();
			bundler.on('bundled',()=>{
				setTimeout(()=>{
					resolve({
						pluginType,
						entryPackage,
						entryDir,
						dirFolder
					})
				},4000)
			})
		} else {
			resolve({
				pluginType,
				entryPackage,
				entryDir,
				dirFolder
			})
		}
	})
}


function watchParcel({
	entryProject,
	distDir,
	cacheDir
}){
	entryProject = path.join(process.cwd(),entryProject)
	const entryPackage = require(entryProject)
	const entryFolder = path.dirname(entryProject)
	const entryDir =  path.resolve(__dirname,entryFolder)
	const entryFile = path.join(entryDir,entryPackage.mainSrc)
	const dirFolder = path.join(entryDir,'dist')
	const cacheFolder = path.join(entryFolder,'.cache')
	const bundler = new Bundler(entryFile, {
		outDir: dirFolder, 
		cache: true, 
		watch: true,
		cacheDir: cacheFolder, 
		minify: true, 
		target: 'node', 
		bundleNodeModules: true,
		sourceMaps: true, 
		detailedReport: true
	})
	log.info(`Graviton SDK -> Started watching.`)
	bundler.bundle();
}

function copyPackageToDist({
	entryProject,
	dirFolder
}){
	return new Promise((resolve,reject) => {
		const dirProject = path.join(dirFolder,'package.json')
		if( !fs.existsSync(dirFolder) ) fs.mkdirSync(dirFolder)
		fs.copyFile(entryProject, dirProject, err => {
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
	return new Promise(async (resolve,reject) => {
		const buildFolder = path.join(entryDir,'build')
		if( !fs.existsSync(buildFolder) ) fs.mkdirSync(buildFolder)
		const buildDir = path.join(buildFolder,`${entryPackage.name}.zip`)
		await zip(dirFolder, buildDir);
		resolve({
			buildDir
		})
	})
}


module.exports = { 
	bundleSource, 
	watchParcel, 
	copyPackageToDist, 
	bundleZip 
}