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
          return cb(code);
    });
}

var count_module = function (name, callback) {
    var cmd = 'npm ls ' + name;
    cp.exec(cmd,
        function (error, stdout, stderr) {
            var pattern = new RegExp(name + '@', 'g');
            var match = stdout.match(pattern);
            if (!match) {
                return callback(null, 0);
            }
            return callback(null, match.length);
        });
};

describe('Duplicate modules', function () {
    ['mapnik'].forEach(function (mod) {
        it('there should only be one ' + mod + ' module otherwise you are asking for pwnage', function (done) {
            this.timeout(4000);
            count_module(mod, function (err, count) {
                if (err) throw err;
                assert.notEqual(count, 0, 'you are missing the ' + mod + ' module (`npm ls ' + mod + '`)');
                assert.equal(count, 1, 'you have more than one copy of ' + mod + ' (`npm ls ' + mod + '`)');
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
