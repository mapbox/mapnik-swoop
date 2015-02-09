#!/usr/bin/env node

var fs = require('fs');
var package_json = JSON.parse(fs.readFileSync('./package.json'));
if (package_json.devDependencies) {
    var devDeps = Object.keys(package_json.devDependencies);
    var add_by_value = [];
    devDeps = devDeps.filter(function(name) {
        if (name == 'mapnik') {
            // ignore mapnik since we want to ensure the top level
            // mapnik works with all deps, and even their devDeps
            return false;
        } else if (name == 'mapnik-test-data') {
            // custom handling for 'mapnik-test-data': because it is not
            // published to npm we can't just do 'npm install mapnik-test-data'
            // so instead we filter it out here and re-add its actual url later
            add_by_value.push(package_json.devDependencies[name]);
            return false;
        }
        return true;
    })
    console.log(devDeps.concat(add_by_value).join(' '));
}
