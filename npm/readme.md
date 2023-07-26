# npm

[npm 官网](https://www.npmjs.com/)

[npm 包开发过程](https://www.cnblogs.com/xiaoheimiaoer/p/5041266.html)

# yarn

[yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable)

## npm 和 yarn 区别

-   [npm 和 yarn 的区别，我们该如何选择?](https://www.jianshu.com/p/254794d5e741)
-   [npm 和 yarn](https://www.jianshu.com/p/7c79b9b08792)

| yarn 命令                    | npm 命令             |
| ---------------------------- | -------------------- |
| npm install                  | yarn                 |
| npm install react --save     | yarn add react       |
| npm uninstall react --save   | yarn remove react    |
| npm install react --save-dev | yarn add react --dev |
| npm update --save            | yarn upgrade         |

## npmmirror 中国镜像站

https://npmmirror.com/

## npm 和 yarn 淘宝镜像

```
NPM
查询当前镜像
npm get registry
设置为淘宝镜像
npm config set registry http://registry.npm.taobao.org/
设置为官方镜像
npm config set registry https://registry.npmjs.org/

YARN
查询当前镜像
yarn config get registry

设置为淘宝镜像
yarn config set registry http://registry.npm.taobao.org/

设置为官方镜像
yarn config set registry https://registry.yarnpkg.com

链接：https://www.jianshu.com/p/1dae26594ce5
```

## npm 和 yarn 的淘宝镜像添加

-   [npm 和 yarn 的淘宝镜像添加](https://www.jianshu.com/p/79d61e27f3f4)

```
NPM
npm config set registry https://registry.npmmirror.com
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/

YARN
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g

持久化文件路径在
C:\Users\用户名
.npmrc和.yarnrc文件
```

## npm 华为镜像

-   [华为镜像](https://mirrors.huaweicloud.com/)
