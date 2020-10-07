## Development server

Copy `environment.ts` file and create `environment.dev.ts` in same directory. Replace apiUrl with target api endpoint.
Run `npm run start:dev`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests code coverage

Run `ng test --code-coverage`. This will generate coverage folder in root directory.
Open index.html in browser.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Required VSCODE extensions

https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials

## Code Formatting tool

Prettier https://prettier.io/

## Shared settings and extension

reference: https://itnext.io/settings-sync-with-vs-code-c3d4f126989

GitHub Gist: 4463fc0058cd17911b54edb8c5379e09

# Report generation

- `npm run compodoc` (compodoc -p tsconfig.json)
- `npm run compodoc-serve` (compodoc -s tsconfig.json)
