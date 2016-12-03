Test latest tags of node-mapnik dependents that track latest node-mapnik

https://www.npmjs.com/browse/depended/mapnik

[![Build Status](https://travis-ci.org/mapbox/mapnik-swoop.svg?branch=master)](https://travis-ci.org/mapbox/mapnik-swoop)

The goal of this repo is to ensure the upcoming node-mapnik release does not accidentally break any dependents. Or, if the upcoming node-mapnik version is known to contain breaking changes: then this repo offers one place to test all those changes have been adapted to before releasing.

### Installing

    npm install


### Testing

    npm test

### Setup

Decide which node-mapnik version you want to test. By default package.json lists:

```js
"mapnik" : "https://github.com/mapnik/node-mapnik/tarball/master"
```

This assumes that:
 - the upcoming node-mapnik release is what you want to test
 - it has been merged into master in preparation for release
 - binaries are published for it
 - you are here testing because you have not yet tagged or `npm published` the version

If dependencies need modified to work with latest mapnik you can:

 - create branches for each dependency needing updated
 - point mapnik-swoop at those branches
 - then re-run mapnik-swoop until everything is passing

### Details

The `install` step above is unique: it installs each dependency from github and then, in a `postinstall` step recurses into each dependency directory to install their `devDependencies`. This is done so that we can actually run each dependencies tests.

The `test` step does two things:

1) Runs a set of `mocha` tests which use a child process to run the tests of each dependency and collect the results. Test failures are reported at the bottom of the run, but the actual failure details are only visible in the stderr printed during the test runs.

2) The tests also ensure no duplicate C++ modules are present after installing all dependents. This is important because duplicate Node C++ modules in a tree can cause bad behavior or crashes. The idea is that if a C++ module is declared at the "top level" by mapnik-swoop (inside the package.json at the root of this directory) then it should no longer be installed in the `node_modules` of any dependencies. If it is then you'll end up with duplicate tests failing and you'll need to resolve these by tweaking downstream dependencies to accept the upcoming node-mapnik version as valid.


### Build status deps

 This is here to provide a quick view of any modules who might have failing tests before any node-mapnik upgrade so that they can be excluded from `mapnik-swoop` or at least fixed before starting to test a new node-mapnik version.


 - node-mapnik - [![Build Status](https://secure.travis-ci.org/mapnik/node-mapnik.svg?branch=master)](http://travis-ci.org/mapnik/node-mapnik) | [![Dependencies](https://david-dm.org/mapnik/node-mapnik.svg)](https://david-dm.org/mapnik/node-mapnik)
 - mapnik-reference - [![Build Status](https://secure.travis-ci.org/mapnik/mapnik-reference.svg?branch=master)](http://travis-ci.org/mapnik/mapnik-reference) | [![Dependencies](https://david-dm.org/mapnik/mapnik-reference.svg)](https://david-dm.org/mapnik/mapnik-reference)
 - abaculus - [![Build Status](https://secure.travis-ci.org/mapbox/abaculus.svg?branch=master)](http://travis-ci.org/mapbox/abaculus) | [![Dependencies](https://david-dm.org/mapbox/abaculus.svg)](https://david-dm.org/mapbox/abaculus)
 - node-blend - [![Build Status](https://secure.travis-ci.org/mapbox/node-blend.svg?branch=master)](http://travis-ci.org/mapbox/node-blend) | [![Dependencies](https://david-dm.org/mapbox/node-blend.svg)](https://david-dm.org/mapbox/node-blend)
 - carmen - [![Build Status](https://secure.travis-ci.org/mapbox/carmen.svg?branch=master)](http://travis-ci.org/mapbox/carmen) | [![Dependencies](https://david-dm.org/mapbox/carmen.svg)](https://david-dm.org/mapbox/carmen)
 - tilelive-vector - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-vector.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-vector) | [![Dependencies](https://david-dm.org/mapbox/tilelive-vector.svg)](https://david-dm.org/mapbox/tilelive-vector)
 - tilelive-bridge - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-bridge.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-bridge) | [![Dependencies](https://david-dm.org/mapbox/tilelive-bridge.svg)](https://david-dm.org/mapbox/tilelive-bridge)
 - mapnik-omnivore - [![Build Status](https://secure.travis-ci.org/mapbox/mapnik-omnivore.svg?branch=master)](http://travis-ci.org/mapbox/mapnik-omnivore) | [![Dependencies](https://david-dm.org/mapbox/mapnik-omnivore.svg)](https://david-dm.org/mapbox/mapnik-omnivore)
 - tilelive-omnivore - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-omnivore.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-omnivore) | [![Dependencies](https://david-dm.org/mapbox/tilelive-omnivore.svg)](https://david-dm.org/mapbox/tilelive-omnivore)
 - vector-tile-query - [![Build Status](https://secure.travis-ci.org/mapbox/vector-tile-query.svg?branch=master)](http://travis-ci.org/mapbox/vector-tile-query) | [![Dependencies](https://david-dm.org/mapbox/vector-tile-query.svg)](https://david-dm.org/mapbox/vector-tile-query)
 - tilelive-mapnik - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-mapnik.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-mapnik) | [![Dependencies](https://david-dm.org/mapbox/tilelive-mapnik.svg)](https://david-dm.org/mapbox/tilelive-mapnik)
 - landspeed.js - [![Build Status](https://secure.travis-ci.org/mapbox/landspeed.js.svg?branch=master)](http://travis-ci.org/mapbox/landspeed.js) | [![Dependencies](https://david-dm.org/mapbox/landspeed.js.svg)](https://david-dm.org/mapbox/landspeed.js)
 - @mapbox/assert-http - [![Build Status](https://secure.travis-ci.org/mapbox/assert-http.svg?branch=master)](http://travis-ci.org/mapbox/assert-http) | [![Dependencies](https://david-dm.org/mapbox/assert-http.svg)](https://david-dm.org/mapbox/assert-http)
 - mapnik-pool - [![Build Status](https://secure.travis-ci.org/mapbox/mapnik-pool.svg?branch=master)](http://travis-ci.org/mapbox/mapnik-pool) | [![Dependencies](https://david-dm.org/mapbox/mapnik-pool.svg)](https://david-dm.org/mapbox/mapnik-pool)
 - geojson-mapnikify - [![Build Status](https://secure.travis-ci.org/mapbox/geojson-mapnikify.svg?branch=master)](http://travis-ci.org/mapbox/geojson-mapnikify) | [![Dependencies](https://david-dm.org/mapbox/geojson-mapnikify.svg)](https://david-dm.org/mapbox/geojson-mapnikify)
 - tilelive-overlay - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-overlay.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-overlay) | [![Dependencies](https://david-dm.org/mapbox/tilelive-overlay.svg)](https://david-dm.org/mapbox/tilelive-overlay)
 - spritezero - [![Build Status](https://travis-ci.org/mapbox/spritezero.svg?branch=master)](http://travis-ci.org/mapbox/spritezero) | [![Dependencies](https://david-dm.org/mapbox/spritezero.svg)](https://david-dm.org/mapbox/spritezero)
 - mapbox-upload-validate - [![Build Status](https://travis-ci.org/mapbox/mapbox-upload-validate.svg?branch=master)](http://travis-ci.org/mapbox/mapbox-upload-validate) | [![Dependencies](https://david-dm.org/mapbox/mapbox-upload-validate.svg)](https://david-dm.org/mapbox/mapbox-upload-validate)
 - raster-tile-query - [![Build Status](https://travis-ci.org/mapbox/raster-tile-query.svg?branch=master)](http://travis-ci.org/mapbox/raster-tile-query) | [![Dependencies](https://david-dm.org/mapbox/raster-tile-query.svg)](https://david-dm.org/mapbox/raster-tile-query)
 - mapbox-tile-copy - [![Build Status](https://travis-ci.org/mapbox/mapbox-tile-copy.svg?branch=master)](http://travis-ci.org/mapbox/mapbox-tile-copy) | [![Dependencies](https://david-dm.org/mapbox/mapbox-tile-copy.svg)](https://david-dm.org/mapbox/mapbox-tile-copy)
 - node-happytiff - [![Build Status](https://travis-ci.org/mapbox/node-happytiff.svg?branch=master)](http://travis-ci.org/mapbox/node-happytiff) | [![Dependencies](https://david-dm.org/mapbox/node-happytiff.svg)](https://david-dm.org/mapbox/node-happytiff)
