var fs = require('fs');
var colors = require('colors');

if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
    console.log('Please specify all configuration parameters. The syntax is \nnode config.js {access key ID} {secret access key} {region}'.red);
    process.exit(1)
}

var accessKeyId = process.argv[2];
var secretAccessKey = process.argv[3];
var region = process.argv[4];

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];
            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }
        return str;
    };

var stream = fs.createWriteStream('config.json');
stream.once('open', function () {
    stream.write('{ "accessKeyId": "{0}", "secretAccessKey": "{1}", "region": "{2}" }'.formatUnicorn(accessKeyId, secretAccessKey, region));
    stream.end();
    console.log('Configuration file has been successfully set. Run\n ')
});