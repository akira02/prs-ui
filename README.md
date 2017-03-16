prs-ui
======

[![Build Status](https://travis-ci.com/akira02/prs-ui.svg?token=Wm6zWbJKuWzhqTz1zW43&branch=master)](https://travis-ci.com/akira02/prs-ui)

UI of PRS (Peer-review System). Much react. So Material. Wow. http://work.maid.cat

Table of Contents
-----------------
* [Dev Guide](#dev-guide)
  * [Project Overview](#project-overview)
  * [Install Dependencies](#install-dependencies)
  * [Build](#build)
  * [Running Local Development Web Servers](#running-local-development-web-servers)
  * [Deploy](#deploy)


Dev Guide
---------

### Project Overview
This is a single page app which uses [React] to render the UI, and [MobX] to hold the application state.

Source codes were written in [TypeScript].

#### Directories
* `src/` - Source code. Compiled to `bundle.js` by webpack.
  * `components/` - React UI components
  * `models/` - Data types
  * `stores/` - Observable stores
* `assets/` - Static files. Files will be recursively copied to `dist/` during build.
* `tools/` - Development tools.
* `dist/` - Build output. ***Changes will be discarded!***


### Install Dependencies
Required tools
* node
* git
* rsync (for deployment)
* yarn

[<img src="https://yarnpkg.com/assets/feature-speed.png" width="250">](https://yarnpkg.com)

```bash
git clone https://github.com/akira02/prs-ui
cd prs-ui
yarn
```

### Build
* **debug build**
  * `npm run build`
  * or `Ctrl+Shift+B` in vscode

* **production build**
  * `npm run build-production`

### Running Local Development Web Servers

`npm start`

* **site server** `http://localhost:8080/`

* **fake api server** `http://localhost:3000/`

### Deploy
`npm run deploy` - runs `build-production` and uploads `dist/`.

[React]: https://facebook.github.io/react/
[MobX]: https://mobx.js.org
[TypeScript]: https://www.typescriptlang.org
