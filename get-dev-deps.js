#!/usr/bin/env node

var fs = require('fs');
var package_json = JSON.parse(fs.readFileSync('./package.json'));
var devDeps = Object.keys(package_json.devDependencies);
devDeps = devDeps.filter(function(name) {
    if (name == 'mapnik' || name == 'mapnik-test-data') {
        return false;
    }
    return true;
})
console.log(devDeps.join(' '));