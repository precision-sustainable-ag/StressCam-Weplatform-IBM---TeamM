
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
import sys
sys.path.append("/home/pi/.local/lib/python3.7/site-packages")
sys.path.append("/home/pi")
import PIL
from PIL import Image
import argparse
import time
import os
from subprocess import run
from subprocess import Popen
import linecache

import platform
import json
import signal
import datetime
import random
import json

import commands
from commandProcessor import commandProcessor

from time import sleep
import gpiozero as gpz


from skimage.io import imread #read images
from skimage.io import imsave
from skimage.transform import resize #resize images
import numpy as np #modify arrays
#from keras.models import load_model # load pretrained models

from tensorflow import lite as tflite
import numpy as np


###############Fill In Your Device Parameters Below##########################

orgId = "szcn70"     #IBM IoT Organization Id
typeId = "Camera"    #IBM IoT Device type
deviceId = "0002"    #IBM IoT Device identification
token = "ConnectedFarms" #IBM IoT Authentication Token
cameraLatitude = "35.763886"
cameraLongitude = "-78.718038"
statusInterval = 720   #Wait x seconds before sending another status update

#########################################################################
from uuid import getnode as get_mac


try:
    import wiotp.sdk.device #changed from import wiotp.sdk.device
except ImportError:
    # This part is only required to run the sample from within the samples
    # directory when the module itself is not installed.
    #
    # If you have the module installed, just use "import wiotp.sdk"
    import os
    import inspect

    cmd_subfolder = os.path.realpath(
        os.path.abspath(os.path.join(os.path.split(inspect.getfile(inspect.currentframe()))[0], "../../../src"))
    )
    if cmd_subfolder not in sys.path:
        sys.path.insert(0, cmd_subfolder)
    import wiotp.sdk.device


def interruptHandler(signal, frame):
    client.disconnect()
    sys.exit(0)

#if the iot.py file is called
if __name__ == "__main__":
    signal.signal(signal.SIGINT, interruptHandler)

    #initialize a client
    client = None
    try:
        options = {
            "identity":{
                "orgId": orgId,
                "typeId": typeId,
                "deviceId": deviceId,
            },
            "auth": {
                "token": token,
            }
        }
        client = wiotp.sdk.device.DeviceClient(options) # create a client using preset values
        client.commandCallback = commandProcessor # set commandCallback to commandProcessor  
        client.connect() # Use MQTT connection to IBM Watson IoT Plateform for publishing events
    except Exception as e:         # store error message in 'e'
        print(str(e))         #  printout error message
        sys.exit(1)         # issue occured, program exit
    print("(Press Ctrl+C to disconnect)")

    street = os.listdir('/home/pi/Pictures/')

    i=0 # 'i' is the image counter

    ## Everything from here onward is the same as commandProcessor code.....??
    while True:
        print("taking Image")
        commands.capture_image()
        #im = imread('/home/pi/images/'+currDate+currTime+imageFormat)
        #Uncomment the above line to use the ML model on the taken image
        file = '/home/pi/Pictures/' + street[i] # set 'file' to image directory
        im = imread(file)
        print("resizing image")
        im_final = resize(im,(200,200)) #Model was trained on 200x200 images

        # Load TFLite model and allocate tensors.
        print("allocating tensors")
        interpreter = tflite.Interpreter(model_path="/home/pi/converted_model.tflite")
        interpreter.allocate_tensors()
        # Get input and output tensors.
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        Xtest = np.array(im_final, dtype = np.float32)

        #test model
        input_data = np.expand_dims(Xtest,axis=0)
        interpreter.set_tensor(input_details[0]['index'], input_data)
        sleep(15)
        print("invoke interpreter")
        interpreter.invoke()
        # The function `get_tensor()` returns a copy of the tensor data.
        # Use `tensor()` in order to get a pointer to the tensor.
        output_data = interpreter.get_tensor(output_details[0]['index'])
        results = np.squeeze(output_data)
        print(results)
        waterStressLevel = int(np.argmax(results))
        percentConfident = results[waterStressLevel]*100
        #Log file
        f =  open('/home/pi/waterStressLog.txt','a')
        #f.write(str(currDate)+str(currTime)+ " : " + str(waterStressLevel)+"\n")
        f.write(street[i] + " : Water Stress Level:" + str(waterStressLevel)+","+str('%.2f'%percentConfident)+"% Confident"+"\n")
        f.close
        print(street[i])
        i= i+1 #Score next image
        print("Water Stress Level", waterStressLevel)
        print("Percent Confident", '%.2f' % percentConfident)
        #CPU Temp
        cpu = gpz.CPUTemperature()
        cpuTemp = cpu.temperature
        print("Sensor Reading")
        #Sensor Reading
        #Get wittyPi Temperature
        #with open('/home/pi/test.txt','w+') as fout:
        #    wittyPi = Popen(["sudo","/home/pi/wittyPi/wittyPi.sh"],stdout=fout)
        #    sleep(15)
        #    os.system("sudo kill %s" %(wittyPi.pid,))
        #    tempLine = linecache.getline("/home/pi/test.txt",8)
        #    wittyPiTemp = float(tempLine[25:30])
        #    fout.close()
        data = {
            "DEVICE_ID": deviceId,
            "DEVICE_STATUS": "On",
            "LATITUDE": cameraLatitude,
            "LONGITUDE": cameraLongitude,
            "WATER_STRESS_LEVEL":waterStressLevel,
            "WITTYPI_TEMPERATURE": random.randrange(30,40), #wittyPiTemp,
            "CPU_TEMPERATURE": cpuTemp,
            "DATE_1":currDate,
            "TIME_1":currTime,
        }
        print("Sending Data")
        client.publishEvent("status","json", data)

        with open('/home/pi/data.txt', 'a') as outfile:
            json.dump(data, outfile)
            outfile.write('\n')
        sleep(statusInterval)
