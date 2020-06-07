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

* mainSrc: Indicates the main source file when developing
* mainDev: Indicates the main destination file  when developing
* main: Indicates the main destination file on production

CLI parameters:

* entry: Indicates the package.json of the project
* target: Indicates the target type (plugin)
* mode: Indicates the build output (dev, release)

