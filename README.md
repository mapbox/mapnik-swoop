Test latest tags of node-mapnik dependents that track latest node-mapnik

https://www.npmjs.com/browse/depended/mapnik

[![Build Status](https://travis-ci.org/mapbox/mapnik-swoop.svg?branch=master)](https://travis-ci.org/mapbox/mapnik-swoop)

### Setup

 - Decide which node-mapnik version you want to test. By default package.json lists `"mapnik" : "https://github.com/mapnik/node-mapnik/tarball/master",` which assumes that:
   - the upcoming node-mapnik release is what you want to test
   - it has been merged into master in preparation for release
   - binaries are published for it
   - you are here testing because you have not yet tagged or `npm published` the version

 - Decide if you need to point any dependencies at custom branches. This may be needed if the upcoming node-mapnik release requires changes to deps or their test fixtures.


### Installing

    npm install


### Testing

    npm test


### Details

The `install` step above is unique: it installs each dependency from github and then, in a `postinstall` step recurses into each dependency directory to install their `devDependencies`. This is done so that we can actually run each dependencies tests.

The `test` step runs a set of `mocha` tests which use a child process to run the tests of each dependency and collect the results. The tests also ensures no duplicate node-mapnik versions are installed after installing all dependents. This is important because duplicate Node C++ modules in a tree can cause bad behavior or crashes. The idea is that if a C++ module is declared at the "top level" (inside the package.json at the root of this directory) then it should no longer be installed in the `node_modules` of any dependencies. If it is then you'll end up with duplicate tests failing that should be resolved by tweaking downstream dependencies to accept the upcoming node-mapnik version as valid.

The goal here is to ensure the upcoming node-mapnik release does not accidentally break any dependents. Or, if the upcoming node-mapnik version is known to contain breaking changes, then this offers one place to test all those changes have been adapted to (by pointing at branches of downstream deps which updated code).


### Build status of each module

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
 - assert-http - [![Build Status](https://secure.travis-ci.org/mapbox/assert-http.svg?branch=master)](http://travis-ci.org/mapbox/assert-http) | [![Dependencies](https://david-dm.org/mapbox/assert-http.svg)](https://david-dm.org/mapbox/assert-http)
 - mapnik-pool - [![Build Status](https://secure.travis-ci.org/mapbox/mapnik-pool.svg?branch=master)](http://travis-ci.org/mapbox/mapnik-pool) | [![Dependencies](https://david-dm.org/mapbox/mapnik-pool.svg)](https://david-dm.org/mapbox/mapnik-pool)
 - geojson-mapnikify - [![Build Status](https://secure.travis-ci.org/mapbox/geojson-mapnikify.svg?branch=master)](http://travis-ci.org/mapbox/geojson-mapnikify) | [![Dependencies](https://david-dm.org/mapbox/geojson-mapnikify.svg)](https://david-dm.org/mapbox/geojson-mapnikify)
 - tilelive-overlay - [![Build Status](https://secure.travis-ci.org/mapbox/tilelive-overlay.svg?branch=master)](http://travis-ci.org/mapbox/tilelive-overlay) | [![Dependencies](https://david-dm.org/mapbox/tilelive-overlay.svg)](https://david-dm.org/mapbox/tilelive-overlay)
 - tilestrata-mapnik - [![Build Status](https://secure.travis-ci.org/naturalatlas/tilestrata-mapnik.svg?branch=master)](http://travis-ci.org/naturalatlas/tilestrata-mapnik) | [![Dependencies](https://david-dm.org/naturalatlas/tilestrata-mapnik.svg)](https://david-dm.org/naturalatlas/tilestrata-mapnik)
