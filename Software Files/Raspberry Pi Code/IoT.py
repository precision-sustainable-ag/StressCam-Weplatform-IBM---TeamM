
#!/usr/bin/env python3
#!/home/pi/.local/lib/python3.7/site-packages

# *****************************************************************************
# Copyright (c) 2014, 2019 IBM Corporation and other Contributors.
#
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License v1.0
# which accompanies this distribution, and is available at
# http://www.eclipse.org/legal/epl-v10.html
# *****************************************************************************
from time import sleep
from os import listdir
import json
import signal
import datetime
import subprocess


from sys import path,exit
path.insert(0,"/home/pi")
path.insert(0,"/usr/local/lib/python3.7/dist-packages")
path.insert(0,"/usr/local/lib/python3.7/dist-packages/wiotp/sdk/api/registry")

#### Custom Modules ####
from commands import capture_image, publish_data, load_file
from wiotp.sdk.api.registry import devices
#import hologram_commands 
from commandProcessor import commandProcessor
import tensor_flow_process
#### Custom Modules ####


#hologram = hologram_commands.network_connect()
from wiotp_login import client
def interruptHandler(signal, frame):
#    hologram_commands.network_disconnect()
    client.disconnect()
    exit(0)

#if the iot.py file is called
if __name__ == "__main__":
    signal.signal(signal.SIGINT, interruptHandler)

    with open('/home/pi/device_info.json') as f:
        data = json.load(f)
    f.close()
    try:
        client.commandCallback = commandProcessor # set commandCallback to commandProcessor  
        client.connect() # Use MQTT connection to IBM Watson IoT Plateform for publishing events
    except Exception as e:         # store error message in 'e'
        print(str(e))         #  printout error message
        exit(1)         # issue occured, program exit
    print("(Press Ctrl+C to disconnect)")
    street = listdir('/home/pi/images/') #list image name insde "images" folder
    i=0 # setting i to be the counter referencing most recent picture
    
    while True:
        print("taking Image")
       	currDate = datetime.datetime.now().strftime("%d_%m_%y")
       	currTime = datetime.datetime.now().strftime("%H_%M_%S")
        capture_image(currDate,currTime) #capture image function, ref:commands.py
        devices.LogEntry
        ####

        water_stress_lv=tensor_flow_process.ml_process(street,i)
        ####
        #Get wittyPi Temperature
        witty_temp = subprocess.run(['sh','get_temp_witty.sh'], stdout = subprocess.PIPE, encoding = 'utf-8')
        #
        camera_data = publish_data(currDate,currTime,water_stress_lv,witty_temp.stdout)
        client.publishEvent('status','json',camera_data)
#        hologram_commands.message_publish(hologram, camera_data)
        with open('/home/pi/data.txt', 'a') as outfile:
            json.dump(camera_data, outfile)
            outfile.write('\n')
        with open('/home/pi/device_info.json') as f:
            data = json.load(f)
        f.close()
        info = load_file('device','image')
        print(info)        
#        sleep(device_info['statusInterval'])
