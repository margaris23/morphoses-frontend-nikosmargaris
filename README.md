# Morphoses Frontend Nikos Margaris Technical Assessment

This is a web page about movie search, using tmdb api.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

App is unit and e2e tested, and also passes Web Accessibility tests according to A and AA WCAG2/2.1 standards.

App can be build and also tested locally (see server.ts).

Whole movies feature is inside `app/movies` folder.

A flat structure, as much as possible, has been chosen for clarity and better scalability.

Made by [Nikos Margaris](https://margaris23.github.io/digital-cv/).

## Prerequisites

Install Nodejs and npm.

[BunJS](https://bun.sh/) could preferably be used for faster and better DX.

## Running the APP

```bash
bun i
bun start
```

or

```bash
npm i
npm start
```

Visit [http://localhost:4200](http://localhost:4200)

## Building

To build the project run:

```bash
bun run build
```

or

```bash
npm run build
```

Optionally you can test build locally

```bash
bun run serve:ssr
```

Visit [http://localhost:4000](http://localhost:4000)

This will compile your project and store the build artifacts in the `dist/` directory.
By default, the production build optimizes your application for performance and speed.


## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
bun run e2e
```

or

```bash
npm run e2e
```

