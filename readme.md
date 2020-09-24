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

### 📜 Instructions

CLI parameters:

* project: Path of the Plugin's folder (where the package.json is located)
* target: Target type:
	* plugin ( aka Dynamic or JavaScript plugin )
	* iconpack ( Icons pack )
	* theme ( UI themes )
* mode: Build type (dev, release)

### 🤖 Who is using this?

* [Deno Graviton](https://github.com/marc2332/deno-graviton)
* [Cargo Graviton](https://github.com/marc2332/cargo-graviton)
* [Flutter Graviton](https://github.com/Graviton-Code-Editor/flutter-plugin)

And Graviton Editor it self.