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
# Lint all source javascript
$ yarn lint

# Lint all stylesheets (SASS and css)
$ yarn lint:style
```

## Building

```
# Builds production code under ./build
$ yarn build

# Outputs webpack.stats.json for use with any bundle analyzer
$ yarn analyze
```

## Contributing

See [Contributing](./docs/CONTRIBUTING.md)
