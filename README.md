# Trip Sorter (Property Finder Front-end case)

## Introduction

> A React application to list the cheapest or fastest path between a departure and an arrival city.

## Technologies used

* React (v16)
* SASS
* Webpack 4
* Redux (Thunk)
* Jest
* Enzyme

## Project structure overview

```
config          // The webpack configuration.
src
│   index.js    // the application entry point.
│   index.html  // main HTML template.
|   store.js    // Redux store setup.
│
└───components  // Base common components goes here.
└───middlewares // Middlewares applied in Redux store.
└───modules
│   └───App        // Provides the AppRoot component.
│   └───Deals      // Reducer, action creators and selectors to manage
|   |              // and provide Deals data to the rest of the application.
│   └───Optimizer  // Reducer, action creators, selectors and utils to compute
|   |              // and provide the optimal path based on available deals.
└───reducers // Combined reducers
└───style    // Common SASS mixins, variables and resets.
└───utils    // General utilities.
```

## The Pathfinder algorithm

> The application uses an implementation of [Dijkstra Algorithm](https://en.m.wikipedia.org/wiki/Dijkstra%27s_algorithm) to create a graph with all "distances" between each city, based on the cheapest or fastest strategy.
> To support the algorithm the [Diqueue](https://github.com/respectus/diqueue) lib was used in order to provide a mininum priority queue.

## Installating and running

> In order to install, run and test the application follow the next instructions.

##### install dependencies

> After cloning the repository navigate to its root folder using the command line and execute the following command:

```shell
> yarn install
# or
> npm install
```

##### Running

> To start the application just run the following command on project's root folder:

```shell
> yarn start
```

##### Testing

> To run the unit tests use the following command on project's root folder:

```shell
> yarn test:unit
```
