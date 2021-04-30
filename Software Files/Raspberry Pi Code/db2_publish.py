from os import RTLD_DEEPBIND, replace, truncate
from subprocess import check_output
import http.client
import json
from change_device_info import read_key_info
# This method will invoke cloud function to parse Json object for db2 database insertion
def db2_data_publish(camera_data):
    key = read_key_info() #read info from device_info.json; ref "change_device_info.py"
    action_name = 'service_binding'
    namespace = key["namespace"]
    headers = {
        'accept': "application/json",
        'content-type': "application/json"
    }
    conn = http.client.HTTPSConnection("us-south.functions.appdomain.cloud")

    conn.request("POST", f"/api/v1/web/{namespace}/default/{action_name}",body=json.dumps(camera_data).encode('utf-8'), headers=headers)

    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
