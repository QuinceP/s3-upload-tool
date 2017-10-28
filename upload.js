var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var colors = require('colors');

/**
 * Check for config.json
 */
if (!fs.existsSync('./config.json')) {
    console.log('config.json'.inverse + ' does not exist. Run \n'.red + 'node config.js YOUR_ACCESS_KEY_ID YOUR_SECRET_ACCESS_KEY REGION');
    process.exit(1);
}

AWS.config.loadFromPath('./config.json');
s3 = new AWS.S3();

/**
 * Checks for all arguments
 */
if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log('Please specify all configuration parameters. The syntax is \nnode upload.js {bucket name} {file or directory to upload}'.red);
    process.exit(1);
}

var bucket = process.argv[2];
var object = process.argv[3];

/**
 * Checks if the file the user is trying to upload exists.
 */
if (!fs.existsSync(object)) {
    console.log('File or directory '.red + object.inverse + ' does not exist. Please try again with a valid file or directory name.'.red);
    process.exit(1);
}

/**
 * Opens a file and uploads it to the bucket.
 * @param file
 */
function read(file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            throw err
        }
        var uploadParams = {Bucket: bucket, Key: file, Body: data};

        s3.upload(uploadParams, function (error, data) {
            if (error) {
                console.log(data.key + ' [' + 'x'.red.bold + ']');
                console.log(error);
            }
            else if (data) {
                console.log(data.key + ' [' + '✓'.green.bold + ']');
            }
        })
    });
}

/**
 * Reads the specified directory.
 * @param dir
 */
function readDir(dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log("Could not list the directory.", err);
            process.exit(1);
        }
        files.forEach(function (file) {
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

/**
 * Check if object is a directory or a file, and read it accordingly.
 * @param file
 */
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
