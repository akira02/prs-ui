prs-ui
======

[![Build Status](https://travis-ci.com/akira02/prs-ui.svg?token=Wm6zWbJKuWzhqTz1zW43&branch=master)](https://travis-ci.com/akira02/prs-ui)


Dev Guide
---------
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
`npm run deploy`

### Project Overview

#### Directories

* `src/` - Source code. Mainly TypeScript. Compiled to `bundle.js` by webpack.
  * `components/` - React UI components
  * `models/` - Data types
  * `stores/` - Observable storage classes
* `assets` - Static files. Files will be recursively copied to `dist/` during build.
* `tools/` - Development tools.
* `dist/` - Build output. _**changes will be discarded**_
