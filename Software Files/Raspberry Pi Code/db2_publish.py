from os import RTLD_DEEPBIND, replace, truncate
#import re
#import subprocess
from subprocess import check_output
import http.client
import json
# This method will invoke cloud function to return API key info for cloudant DB
def db2_data_publish(camera_data):
#secrect= check_output("ibmcloud iam oauth-tokens", shell = True, encoding='utf-8')
#sec = secrect.split("IAM token:  ",1)[1]
#sec = sec.split("\n",1)[0]
    action_name = 'service_binding'
    namespace = 'namespace'
    #   print(key)
    headers = {
        'accept': "application/json",
        #'authorization': sec,
        'content-type': "application/json"
    }
    conn = http.client.HTTPSConnection("us-south.functions.appdomain.cloud")

    conn.request("POST", f"/api/v1/web/{namespace}/default/{action_name}",body=json.dumps(camera_data).encode('utf-8'), headers=headers)

    res = conn.getresponse()
    data = res.read()
    #print(json.loads(data.decode("utf-8"))['ibm_info'])
    print(data.decode("utf-8"))
