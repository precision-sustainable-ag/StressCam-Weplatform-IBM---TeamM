var strftime = require('strftime')
// Credential and configuration for the IBM Cloud Object Storage
const serviceAcctCred = {
  "apikey": "gybYALxIH2Nc0ELrohrjwgl1LnurOxGEmQWdqANcJC32",
  "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloud-object-storage:global:a/d4e12d2e68ac49739d6a9a2110fe065a:17c89dfe-3bc3-4077-af11-2b3625c83a11::",
  "iam_apikey_name": "auto-generated-apikey-3ee9ddd0-5a53-4a1e-9777-02c55826e8f2",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/d4e12d2e68ac49739d6a9a2110fe065a::serviceid:ServiceId-37d5a237-08d3-4d48-bb91-62ae8fa044b1",
  "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/d4e12d2e68ac49739d6a9a2110fe065a:17c89dfe-3bc3-4077-af11-2b3625c83a11::"
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
