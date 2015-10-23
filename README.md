# Lybica Web

`lybica-web` is the Web site of `Lybica` platform. It uses `npm` as the package manager. Before running it, you should have installed [node](https://nodejs.org).

## Files tree

```
.
├── src
│   ├── css
│   │   ├── includes
│   │   └── main.styl
│   ├── index.html
│   └── js
│       └── main.js
├── dist
│   ├── css
│   ├── fonts
│   └── js
├── fontify.json
├── package.json
├── README.md
├── .travis.yml
```

* Folder `src` contains all the source code of html, javascript and css(stylus)
* Folder `dist` is used in deployment, it contains all the compiled and minified sources of html, javascript and css
* `fontify.json` specify the fonts packages used
* `.travis.yml` is the configuration for the Travis-CI

## Run the project locally

1. Clone the project from github.
1. Execute `npm install` to install all dependencies.
1. Execute `npm run server` to view the web site on the browser.

