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
	distPath: string
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
		projectPath,
		distPath
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
		
		this.distPath = distPath || path.join(this.projectPath, 'dist')
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
				path: this.distPath,
				libraryTarget: 'commonjs'
			},
			module: {
				rules: [
					{
						test: /\.(png|jpe?g|gif|html)$/i,
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						}
					},
					{
						test: /\.(js)$/,
						loader: 'shebang-loader'
					},
					{
						test: /\.(jsx|js)$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react'
							],
							plugins: [
								[
									"@babel/plugin-transform-runtime",
									{
										"regenerator": true
									}
								]
							]
						}
					},
					{
						test: /\.(tsx|ts)$/,
						exclude: /node_modules/,
						loader: 'ts-loader',
						options: {
							onlyCompileBundledFiles: true,
							"compilerOptions": {
								"sourceMap": true,
								"target": "es6",
								"lib": ["ES2020", "dom"],
								"module": "commonjs",
								"moduleResolution": "node",
								"esModuleInterop": true,
								"resolveJsonModule": true,
								"jsx": "react",
								"types": ["node"]
							}
						}
					}
				]
			},
			resolve:{
				extensions: ['.ts','.js','.tsx','.jsx'],
			},
			node: {
				__dirname: false,
				__filename: false,
			},
			target: 'node',
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
						const info = stats.toJson();
						resolve(stats.hasErrors() ? info.errors : null)
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
						resolve(...[err])
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
						resolve(...[err])
					})
					break;
				default: 
					resolve(this)
			}
		})
	}
	public watch(callback: (err: any, stats: any) => void){
		return new Promise(async (resolve) => {
			if( !fs.existsSync(this.distPath) ){
				fs.mkdirSync(this.distPath)
			}
			if(this.pluginType == 'plugin'){
				this.compiler({
					dev: true
				}).watch({},(err: string, stats: any) => {
					const info = stats.toJson();
					callback(stats.hasErrors() ? info.errors : null,stats)
				})
				resolve(this)
			}
		})
	}
	public copyAssets(){
		return new Promise(async (resolve) => {
			const dirProject = path.join(this.distPath, 'package.json')
			const { assets } = this.packageConf
			
			if(assets){
				await Promise.all(assets.map((asset: string) => {
					return new Promise(res => {
						const assetPath = path.join(this.projectPath, asset)
						const assetDistPath = path.join(this.distPath, asset)
						ncp(assetPath, assetDistPath, {}, (err: string) => {
							if(err) console.log(err)
							res()
						})
					})
				}))
			}
			
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
