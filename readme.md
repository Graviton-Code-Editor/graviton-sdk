# 🧵 Graviton SDK
CLI to develop plugins for [Graviton Editor](https://github.com/Graviton-Code-Editor/Graviton-App)

This has a built-in bundle (parcel) and a zipper.

### ✍ Usage
Installation:

```shell
npm install --save-dev @gveditor/sdk
```

Develop plugin for development:
```shell
gvsdk --entry package.json --target plugin --mode dev
```

Build plugin for production:
```shell
gvsdk --entry package.json --target plugin --mode release
```

Available targets:
* plugin ( aka Dynamic or JavaScript plugin)
* iconpack (Icons pack)

### 📜 Instructions

Plugins targeting `plugin` need to specify some keys in it's Manifest file.

* mainSrc: Main file path
* mainDev: Main file destination path when developing
* main: Main file in production

CLI parameters:

* entry: Path of package.json
* target: Target type (plugin | iconpack)
* mode: Build type (dev, release)

### 🤖 Who is using this?

* [Deno Graviton](https://github.com/marc2332/deno-graviton)
* [Cargo Graviton](https://github.com/marc2332/cargo-graviton)
* [Flutter Graviton](https://github.com/Graviton-Code-Editor/flutter-plugin)

And Graviton Editor it self.