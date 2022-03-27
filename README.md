# TherapyPet

![build](https://github.com/chibat/chrome-extension-typescript-starter/workflows/build/badge.svg)

Chrome Extension, TypeScript and Visual Studio Code

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

* TypeScript
* Webpack
* React
* Jest

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Config
Add `config.js` within `/src`

Example
```
export default {
    DEEPAI_API_KEY: 'YOUR_KEY_HERE',
    CAT_API: 'YOUR_KEY_HERE'
}
```

## Build in watch mode

### terminal

```
npm run watch
```

## Add `/dist` folder to chrome
## Build

```
npm run build
```
## Test
`npx jest` or `npm run test`
