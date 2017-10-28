# s3-upload-tool

An application to upload data to Amazon S3.

## Getting Started

### Prerequisites

s3-upload-tool requires:

[Node.js](https://nodejs.org/en/download/package-manager/) (v6.11.5+)

[npm](https://www.npmjs.com/get-npm) (v3.10.10+)

Npm comes bundled with node.js, so you shouldn't have to install npm separately.

### Installation
```
cd s3-upload-tool
npm install
```

### Configuration
To let the application connect to your s3 account, the credentials must be set in the config.json file.
```
node config.js <YOUR_ACCESS_KEY_ID> <YOUR_SECRET_ACCESS_KEY> <REGION>
```

You can also create the config.json file manually and place the following inside the json file:

```
{ "accessKeyId": <YOUR_ACCESS_KEY_ID>, "secretAccessKey": <YOUR_SECRET_ACCESS_KEY>, "region": <REGION> }
```

## Running the application
To upload a file or directory,

```
node upload.js {bucket name} {file or directory to upload}
```



## Built With

* [aws-sdk](https://aws.amazon.com/sdk-for-node-js/) - AWS SDK for JavaScript in Node.js
* [colors](https://www.npmjs.com/package/colors) - Get color and style in your node.js console

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

* [**Christen Ward**](https://github.com/QuinceP)


