# 🧵 Graviton SDK
CLI to develop plugins for [Graviton Editor](https://github.com/Graviton-Code-Editor/Graviton-App)

This uses Parcel (v1.12.4) so you can do cool things as using:

* TypeScript
* CoffeScript
* Rust

See Parcel's documentation for more: https://parceljs.org/getting_started.html

### ✍ Usage
Installation:

```shell
npm install --save-dev @gveditor/sdk
```

Develop plugin locally:
```shell
gvsdk --entry package.json --target plugin --mode dev
```

Build plugin for production:
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
