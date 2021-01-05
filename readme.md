# 🧵 Graviton SDK
SDK to develop plugins for [Graviton Editor](https://github.com/Graviton-Code-Editor/Graviton-App)

It makes use of Webpack, ts-loader and babel under the hood.

### ✍ Usage
Installation:

```shell
npm install --save-dev @gveditor/sdk
```

Develop plugin for development:
```shell
gvsdk --project ./ --target plugin --mode dev
```

Build plugin for production:
```shell
gvsdk --project ./ --target plugin --mode release
```

### 📜 Usage

Manifest file (package.json) should have the property `mainSrc` which indicates where the entry file (aka main file) is located.

Example:

```json
{
	"name": "plugin-example",
	"type":"plugin",
	"version": "1.0.0",
	"mainSrc": "src/main.js",
	"main": "main.js",
	"license": "MIT"
}
```

CLI parameters:

* `--project`: Path of the Plugin's folder where the manifest (package.json) is located
* `--target`: Target type:
	* `plugin` ( aka Dynamic or JavaScript plugin )
	* `iconpack` ( Icons pack )
	* `theme` ( UI themes )
* `--mode`: Build type (dev, release)
* `--platform`: Any webpack target, it defaults to 'node'

Example:

```ts
gvsdk --target plugin --project . --mode release
```

This will generate a release of the plugin you are located in.

### 🤖 Where is this being used?

* [Deno Graviton](https://github.com/marc2332/deno-graviton)
* [Cargo Graviton](https://github.com/marc2332/cargo-graviton)
* [Flutter Graviton](https://github.com/Graviton-Code-Editor/flutter-plugin)

And Graviton Editor itself.
