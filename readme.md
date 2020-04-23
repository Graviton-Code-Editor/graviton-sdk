# Graviton SDK

### Prequisites:
package.json must contain these 3 keywords:

* mainSrc: indicates the main source file
* mainDev: the destination of the main file when developing the plugin it self
* main: the destination of the main file when built

### Installation
Globally:
`npm install @gveditor/sdk -g`

Or, as a dev dependency:

`npm install @gveditor/sdk --save-dev`

### Developing
`gvsdk --entry package.json --target plugin`

### Building
`gvsdk --entry package.json --target plugin --mode release`