
> vue 基础脚手架

## 快速上手

执行如下命令，然后打开[http://localhost:8080](http://localhost:8080)

```bash
npm install
运行项目：
npm run start
打包场景分为两种：
测试环境下打包：npm run release:test
正式环境下打包：npm run release
两个环境下打包的不同之处在于：
测试环境下打包：会保留项目中的console，注释等，这样出现bug时可以方便在测试环境寻找问题
正式环境下打包：会进行代码的压缩，删除没用的console，注释等

分析包的结构：npm run release:report
```
