import * as path from 'path'
import { zip } from 'zip-a-folder'
import fs from 'fs-extra'
import { ncp } from 'ncp'
import webpack  from 'webpack'

const allowedDirs = [
	'package.json',
	'icons'
]

interface BundlerArgs {
	projectPath: string
}

class Bundler {
	projectPath: string
	packagePath: string
	packageConf: any
	pluginType: string
	entryFile: string
	distPath: string
	buildPath: string
	releasePath: string
	
	constructor({
		projectPath
	}: BundlerArgs){
		this.packagePath = path.join(projectPath, 'package.json')
		this.projectPath = projectPath
		
		try {
			this.packageConf = require(this.packagePath);
		} catch(err){
			console.log(err)
		}
		
		this.pluginType = this.packageConf.type || 'plugin'
		
		this.entryFile = path.join(this.projectPath, this.packageConf.mainSrc)
		
		this.distPath = path.join(this.projectPath, 'dist')
		this.buildPath = path.join(this.projectPath, 'build')
		this.releasePath = path.join(this.buildPath,`${this.packageConf.name}_v${this.packageConf.version}.zip`)
	}
	private compiler({ dev = false} = {}){
		const config = {
			mode: dev ? 'development' : 'production',
			entry:{
				index: this.entryFile
			},
			output:{
				path: this.distPath
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						loader: 'ts-loader'
					}
				]
			},
			watch: false
		}
		if(dev){
			config.watch = true
		}
		return webpack(config);
	}
	public bundle(){
		return new Promise(async (resolve) => {
			if( !fs.existsSync(this.distPath) ){
				fs.mkdirSync(this.distPath)
			}
			switch(this.pluginType){
				case 'plugin':
				
					this.compiler().run((err: string,stats: any) => {
						if(!err){
							resolve(this)
						} else {
							console.error(err)
						}
					})

					break;
				case 'iconpack':
					ncp(this.projectPath, this.distPath, {
						filter: (dir: string)=> {
							if(allowedDirs.includes(path.basename(dir)) || dir === this.projectPath ){
								return true
							}
							return false
						}
					}, (err: string) => {
						if(err){
							console.error(err)
						}else{
							resolve(this)
						}
					})
					break;
				case 'theme':
					const cmThemePath = path.join(this.projectPath, this.packageConf.fileTheme || '')
					const cmThemeDir = path.parse(path.relative(this.projectPath, cmThemePath)).dir
					ncp(this.projectPath, this.distPath, {
						filter: (dir: string) => {
							if(allowedDirs.includes(path.basename(dir)) || dir === this.projectPath || path.basename(dir) === cmThemeDir || dir === cmThemePath){
								return true
							}
							return false
						}
					}, (err: string) => {
						if(err){
							console.error(err)
						}else{
							resolve(this)
						}
					})
					break;
				default: 
					resolve(this)
			}
		})
	}
	public watch(){
		return new Promise(async (resolve) => {
			if( !fs.existsSync(this.distPath) ){
				fs.mkdirSync(this.distPath)
			}
			if(this.pluginType == 'plugin'){
				this.compiler({
					dev: true
				}).watch({},(err: string,stats: any) => {
					resolve(...[err,stats])
				})
			}
		})
	}
	public copyAssets(){
		return new Promise((resolve) => {
			const dirProject = path.join(this.distPath,'package.json')
			fs.copyFile(this.packagePath, dirProject, (err: string) => {
				if (err) throw err;
				resolve()
			});
		})
	}
	public zip(){
		return new Promise(async (resolve) => {
			if( !fs.existsSync(this.buildPath) ) {
				fs.mkdirSync(this.buildPath)
			}
			await zip(this.distPath, this.releasePath);
			resolve(this)
		})
	}
}

module.exports = { Bundler }
