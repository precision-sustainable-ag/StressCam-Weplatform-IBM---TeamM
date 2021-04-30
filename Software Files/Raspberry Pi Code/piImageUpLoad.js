// This is from a tutorial: https://cloud.ibm.com/docs/node?topic=node-object-storage
var strftime = require('strftime')
// Credential and configuration for the IBM Cloud Object Storage
const serviceAcctCred = {
  "apikey": "",
  "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
  "iam_apikey_description": "",
  "iam_apikey_name": "",
  "iam_role_crn": "",
  "iam_serviceid_crn": "",
  "resource_instance_id": ""
};

// The endpoint for the US, yours might be different
const storageEndpoint = "s3.us-east.cloud-object-storage.appdomain.cloud";
var time = strftime('%Y-%m-%d-%H:%M:%S');
const fname = "/home/pi/images/17_11_2020_13_35_35.jpg";
const bucket = "cloud-object-storage-zo-cos-standard-kfh";



const PiCamera = require('pi-camera');

const myCamera = new PiCamera({
	mode: 'photo',
	output: fname,
	nopreview: true
});





const ObjectStorageLib = require("ibm-cos-sdk");
const objectStorage = new ObjectStorageLib.S3({
	endpoint: storageEndpoint,
	apiKeyId: serviceAcctCred.apikey,
	ibmAuthEndpoint: 'https://iam.bluemix.net/identity/token',
    	serviceInstanceId: serviceAcctCred.resource_instance_id
});


const fs = require("fs");


// The image file size is less than 5 MB, so there's no need for a 
// multi-part upload
const uploadImage = (key, callback) => {

    fs.readFile(fname, (err, data) => { 
		if (err) {
			console.log(`Error reading file ${fname}: ${err}`);
			process.exit();
		}
		  	
		objectStorage.putObject({
			Bucket: bucket,
			Key: key,
			ACL: "public-read",
			Body: data
		}).promise()
		.then(callback)
		.catch(e => console.log("Image upload error: " + e))
	});
};





myCamera.snap()
	.then(uploadImage("picture.png", () => {
		console.log("Done");
		process.exit();
	}))
	.catch(err => console.log('myCamera.snap error ' + err));
