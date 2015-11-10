var assert = require('assert');
var cp = require('child_process');
var path = require('path');
var package_json = require('./package.json');
var existsSync = require('fs').existsSync || require('path').existsSync;

var cmd_path = path.join(__dirname,'../bin/');
var sep = ':';
if (process.platform === 'win32') {
    sep = ';'
}
process.env.PATH = cmd_path + sep + process.env.PATH;
process.env.NODE_PATH = path.join(__dirname,'../lib/');

function run(name, command,args,opts,cb) {
    var child = cp.spawn(command,args,opts);
    console.log('\n\n' + name + ' --> ');
    var streaming = false;
    var count = 0;
    var buffered_stdout = '';
    child.stdout.on('data', function (data) {
        var msg = data.toString();
        if (msg.indexOf('not ok ') > -1) {
            console.error(msg.slice(0,msg.length-1));
            streaming = true;
        } else if (streaming) {
            if (msg.indexOf('ok ') > -1) {
                streaming = false;
            } else {
                console.error(msg.slice(0,msg.length-1));
            }
        } else {
            ++count;
            buffered_stdout += msg;
            if (count % 100 == 0) {
                console.log('waiting...');
            }
        }
    });
    child.stderr.on('data', function (data) {
        var msg = data.toString();
        console.error(msg.slice(0,msg.length-1));
    });
    child.on('close', function (code) {
          if (code != 0) {
            console.log(buffered_stdout);
          }
          return cb(code);
    });
}

var count_module = function (name, callback) {
    var cmd = 'npm ls ' + name;
    cp.exec(cmd,
        function (err, stdout, stderr) {
            var pattern = new RegExp(' ' + name + '@', 'g');
            var match = stdout.match(pattern);
            if (!match) {
                return callback(err, 0);
            }
            return callback(err, match.length,stdout);
        });
};

describe('Duplicate modules', function () {
    ['mapnik','gdal','srs','mapnik-reference'].forEach(function (mod) {
        it('there should only be one ' + mod + ' module otherwise you are asking for pwnage', function (done) {
            count_module(mod, function(err, count, output) {
                assert.notEqual(count, 0, 'you are missing the ' + mod + ' module - `npm ls ' + mod + '` gave:\n' + output);
                assert.equal(count, 1, 'you have more than one copy of ' + mod + ' - `npm ls ' + mod + '` gave:\n' + output);
                // throw error only if other asserts work
                if (err) throw err;
                done();
            });
        });
    });
});

var apps = package_json.dependencies;

describe('Dependents', function() {
    Object.keys(apps).forEach(function(app) {
        if (app != 'mapnik') {
            it(app + ' tests ', function(done) {
                var app_dir = path.join(__dirname,'node_modules',app);
                var opts = {cwd:app_dir}
                run(app,'npm',['test'],opts, function(code) {
                    assert.equal(0,code);
                    done();
                });
            });
        }
    });
});
