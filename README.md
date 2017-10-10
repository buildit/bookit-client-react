# Bookit

This is the front end for Bookit, a room booking app created by Buildit. It runs against the [Bookit API](https://github.com/buildit/bookit-api).


## Quick start

```
# If you don't already have it
$ brew install yarn

# Install dependencies
$ yarn

# Run the app in dev mode on localhost:3001
$ yarn start
```

## Testing

```
# Run unit tests as a one-off
$ yarn test

# Run unit tests continuously
$ yarn test:watch
```
To run unit tests

### Run end-to-end UI testing
```
yarn cucumber
```

## Linting

```
# Lint all source typescript
$ yarn lint

# Lint all stylesheets (SASS and css)
$ yarn lint:style
```

## Building

```
# Builds self-contained deployable production code under ./build
$ yarn build

# Outputs webpack.stats.json for use with any bundle analyzer
$ yarn analyze
```

## Troubleshooting

React has recently moved to version 16 which has caused a cascade of incorrect peerDependencies.

The source of this codebase has been modified to cope with these issues, but in case of total failure to make things work, the following commands can be used to install the correct dependencies overall.
```sh
$ yarn add history immutable react react-dom react-redux react-router-redux@next redux redux-actions redux-saga reselect reselect-immutable-helpers

$ yarn add @types/chai-enzyme@beta @types/history @types/jest @types/node @types/react @types/react-dom @types/react-hot-loader @types/react-redux @types/react-router @types/react-router-redux @types/redux @types/redux-actions @types/webpack-env autoprefixer awesome-typescript-loader babel-core babel-loader babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread babel-plugin-transform-runtime babel-preset-env babel-preset-react browserslist chai chai-enzyme chromedriver cheerio clean-webpack-plugin css-loader cucumber enzyme enzyme-adapter-react-16 extract-text-webpack-plugin file-loader html-webpack-plugin identity-obj-proxy jest name-all-modules-plugin node-sass postcss-loader react-hot-loader@next react-test-renderer sass-loader script-ext-html-webpack-plugin selenium-webdriver style-loader stylelint ts-jest tslint tslint-loader tslint-no-unused-expression-chai typescript url-loader webpack webpack-dev-server webpack-merge -D
```

## Contributing

See [Contributing](./docs/CONTRIBUTING.md)
