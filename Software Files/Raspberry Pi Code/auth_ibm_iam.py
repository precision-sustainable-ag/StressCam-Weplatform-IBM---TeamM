from sys import path
path.insert(0,'/usr/local/lib/python3.7/dist-packages/cloudant')
from cloudant.client import Cloudant
from cloudant.query import Query
import subprocess, re
#########Custom Mdodules############
from change_device_info import read_key_info
import authenticate

# This method will make a request to IBM cloud function which will return the API info needed for wiotp login from cloudant DB.
def ibm_auth():
	key = read_key_info() #read info from device_info.json; ref "change_device_info.py"
	api_info = authenticate.api_key_request(key["namespace"],key["passpharse"]) # invoke cloud function; ref "authenticate.py"
	username = api_info["user_name"] 
	api_key =  api_info["api_key"]
	return Cloudant.iam(username, api_key, connect=True) #login to cloudent DB 

# This method will match the unique RPI serial No. to look for the specific document that is for your specific device inside cloudant DB.
def query_wiotp_info():
	client = ibm_auth() #assign cloudant credential 
	serial_info  =subprocess.check_output(['cat /proc/cpuinfo'],shell = True, encoding="UTF-8") #invoke shell script for cpu serial info
	serial_info = re.search("([0-9a-z]{16})", serial_info) #regex search for serial info
	selector= {
	      "_id": ""
	}
	doc_id = f"camera_wiotp_info:{serial_info[0]}" #this is the format used inside cloudant DB to identify wiotp login info for your device
	selector['_id'] = doc_id 
	db=client['wiot_platform_camera_credential'] #specify DB name
	query = Query(db, partition_key='camera_wiotp_info', selector=selector, skip = 0, limit=1) # make query to the cloudant DB
	wiotp_login_info= query()['docs'][0]['wiotp_info'] #extract wiotp login info from queried document
	return wiotp_login_info #return wiotp login info back to IoT.py


