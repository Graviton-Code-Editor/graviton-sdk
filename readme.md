# 🧵 Graviton SDK
CLI to develop plugins for [Graviton Editor](https://github.com/Graviton-Code-Editor/Graviton-App)

### ✍ Usage
Installation:

```shell
npm install --save-dev @gveditor/sdk
```
Example Scripts:

Develop plugin:
```shell
gvsdk --entry package.json --target plugin
```

Build plugin:
```shell
gvsdk --entry package.json --target plugin --mode release
```

### 📜 Instructions
package.json must include these 3 keywords:

* mainSrc: Main file path
* mainDev: Main file destination path when developing
* main: Main file in production

CLI parameters:

* entry: Path of package.json
* target: Target type, only supports plugin for now
* mode: Build type (dev, release)

### 🤖 Who is using this?

* [Deno Graviton](https://github.com/marc2332/deno-graviton)
* [Cargo Graviton](https://github.com/marc2332/cargo-graviton)
* [Flutter Graviton](https://github.com/Graviton-Code-Editor/flutter-plugin)

