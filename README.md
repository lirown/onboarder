> This project is currently in development.

[![CI](https://github.com/lirown/onborder/workflows/CI/badge.svg)](https://github.com/lirown/onborder/actions)
[![Built with onborder-starter](https://img.shields.io/badge/built%20with-pwa--onborder--starter-blue)](https://github.com/lirown/dojo-starter 'Built with pwa-dojo-starter')

# 🦸‍♀️ Onborder 

> onborder is the official platform to expose how we do merchant onboarding @ Forter.

[![onborder](https://github.com/lirown/onborder/blob/main/preview.png?raw=true)](https://lirown.github.io/dojo)

## 👨‍🏭 Installing

Clone from the current repo and then run the following command inside the root folder:

```bash
npm i
```

## 🧙‍♂️ CLI

`npm` are included as follows:

- `build` runs build command to pack onborder
- `start` runs client using `rollup` in the root directory
- `test` runs the unit and e2e test suites
- `lint` runs ESLint with --fix flag to fix problematic patterns in code. Ignore warnings.
- `format` runs prettier with --fix flag to auto format code.
- `coverage` runs nyc to produce a test coverage report
- `check-outdated` runs `david` which check if package npm dependencies are out of date
- `check-vulnerabilities"` runs `nsp` which check if package npm dependencies have security issues
  

👨‍🏭 Installing
  
Clone from the current repo and then run the following command inside the root folder:

```bash
npm i
```

🤵 Directory Layout

```
├─ images/
├─ patches/
├─ server/
├─ client/
│  ├─ components/
│  │  └─ ···
│  ├─ helpers/
│  │  ├─ page-element.js
│  │  └─ ···
│  ├─ pages/
│  │  ├─ page-home.js
│  │  └─ ···
│  ├─ router/
│  │  └─ routes.js
│  └─ config.js
├─ app.js
├─ app.css
├─ index.html
├─ manifest.webmanifest
├─ package.json
├─ robots.txt
├─ rollup.config.js
└─ tsconfig.json
```

## 👩‍💻 Using locally

This command serves the app at `http://localhost:8000`:

```sh
    npm start
```

## 👨‍⚕️ Linting

[ESLint](eslint.org) comes already installed, extending [eslint-recommanded](http://rapilabs.github.io/eslintrc-generator). Don't forget to install the appropriate [plugin for your editor](http://eslint.org/docs/user-guide/integrations).

```sh
 npm run fix-lint
```

## 👨‍🔬 Testing

Testing is done using [mocha](mochajs.org) and [chai](chaijs.com).
[chai-as-promised](https://github.com/domenic/chai-as-promised) is included to test promise-based code.
Mocks, stubs, etc. can be done using [sinon](sinonjs.org).
[nock](https://github.com/node-nock/nock) is used to test HTTP requests.
Nock also disables your app from performing any HTTP requests during tests (see `test/setup.js`).

There are examples for each library in `test/foo.spec.js`.

```sh
npm test
```

## 🚀 Deployment

The service knows to auto-deploy itself using firebase automatically.
If you still need to manually deploy, run the following commands:

1. Globally install firebase tools:

```sh
npm install -g firebase-tools
```

2. Run in root folder:

```sh
npm run build
```

3. Run in root folder:

```sh
firebase deploy
```

Alternatively to 3, you could also make a preview, which is parralel to the production deploy and will be auto-deleted.:
Note this is a beta feature and will later on be automatically created in PRs.

```sh
firebase hosting:channel:deploy YOUR_PREVIEW_NAME_HERE
```

## 💂 Coverage

[Istanbul](https://github.com/gotwarlost/istanbul) is used to produce a test coverage report. Look inside the `coverage` folder after running `npm run coverage` to see the results.

```sh
npm run coverage
```

## 👨‍🚀 Deploying

The app will be deployed to Github pages once merged to `main` branch
