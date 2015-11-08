# Lybica Web

`lybica-web` is the Web site of `Lybica` project. It uses `npm` as the package manager. Before running it, you should have installed [node](https://nodejs.org).

## Files tree

```
.
├── src
│   ├── css
│   │   ├── includes
│   │   └── main.styl
│   ├── jade
|   |   ├── layout.jade
|   |   └── index.jade
│   └── js
│       └── base.js
├── dist
│   ├── css
│   ├── fonts
│   └── js
├── fontify.json
├── package.json
├── README.md
├── .travis.yml
```

* Folder `src` contains all the source code of jade, javascript and stylus
* Folder `dist` is used in deployment, it contains all the compiled and minified sources of html, javascript and css
* `fontify.json` specify the fonts packages used
* `.travis.yml` is the configuration for the Travis-CI

## Run the project locally

1. Clone the project from github.
1. Execute `npm install` to install all dependencies.
1. Install `grunt` globally by `npm install grunt-cli -g`
1. Execute `npm start` to view the web site on the browser.
