// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create S3 service object
s3 = new AWS.S3();

if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log('Please specify all configuration parameters. The syntax is \nnode upload.js {bucket name} {file or directory to upload}'.red);
    process.exit(1)
}

var bucket = process.argv[2];
var object = process.argv[3];

if (!fs.existsSync(object)) {
    console.log('File or directory '.red + object.inverse + ' does not exist. Please try again with a valid file or directory name.'.red);
    process.exit(1)
}

function read(file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            throw err
        }
        var uploadParams = {Bucket: bucket, Key: file, Body: data};

        s3.upload(uploadParams, function (error, data) {
            if (error) {
                console.log(data.key + ' [' + 'x'.red.bold + ']')
                console.log(error);
            }
            else if (data) {
                console.log(data.key + ' [' + '✓'.green.bold + ']')
            }
        })
    });
}

function readDir(dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log("Could not list the directory.", err);
            process.exit(1)
        }
        files.forEach(function (file) {
            // Make one pass and make the file complete
            var fromPath = path.join(dir, file);

            fs.stat(fromPath, function (error, stat) {
                if (error) {
                    console.error("Error stating file.", error);
                    return;
                }
                if (stat.isFile()) {
                    read(fromPath);
                }
                else if (stat.isDirectory()) {
                    readDir(fromPath);
                }
            });
        });
    })

}

function checkFileTypeAndReadFile(file) {
    fs.stat(file, function (error, stat) {
        if (error) {
            console.error("Error stating file.", error);
            return;
        }
        if (stat.isFile()) {
            read(file);
        }
        else if (stat.isDirectory()) {
            readDir(file);
        }
    });
}

checkFileTypeAndReadFile(object);
