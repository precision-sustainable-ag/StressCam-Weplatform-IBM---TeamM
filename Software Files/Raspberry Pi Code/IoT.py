
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
from subprocess import call
from subprocess import Popen
import linecache

import platform
import json
import signal
import datetime
import random
import json
import board
import busio
import adafruit_veml7700
import adafruit_mlx90614
from capture_image import capture_image, change_resolution

from picamera import PiCamera
from time import sleep
import gpiozero as gpz


from skimage.io import imread #read images
from skimage.io import imsave
from skimage.transform import resize #resize images
import numpy as np #modify arrays
#from keras.models import load_model # load pretrained models

from tensorflow import lite as tflite
import numpy as np


############Global Variables########################################
imageWidth = 640
imageHeight = 480
imageResolutionX = 2592  #(2592,1944) (1920,1080)
imageResolutionY = 1944
imageFormat = '.jpg'
imageFrameRate = 10


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


def commandProcessor(cmd):
    global statusInterval
    global imageWidth
    global imageHeight
    global imageResolutionX
    global imageResolutionY
    global imageFormat
    global imageFrameRate
    global waterStressLevel
    global data
    global currTime
    global currDate
    command = cmd.data['CommandType']

    # print recieved command
    print("Command received: %s" % command)

    if(command == "changeResolution"):
        change_resolution(int(cmd.data['imageResolutionX']), int(cmd.data['imageResolutionY']))

    # if command is take image
    if command == "takeImage"
        capture_image()

    # if command is resize image
    if(command == "resizeImage"):
        if((int(cmd.data['Height'])<=1944) or (int(cmd.data['Width']<=2592))): # only allow maximum resize of 2592 x 1944, else show error message
            imageHeight = int(cmd.data['Height'])
            imageWidth = int(cmd.data['Width'])
            print("Images Resized to", imageWidth,"x", imageHeight)
        else:
            print("Images not resized, size too large")

    # if command is change send interval
    # Web page shows button to change status update interval value in minuits
    if(command == "changeSendInterval"):
        statusInterval = int(cmd.data['Interval'])*60 # convert received minute interval to seconds
        print("Interval Changed to:", statusInterval,"seconds") # display interval value in seconds

    # if command is run script
    if(command == "runScript"):
        script = cmd.data['scriptType'] # scriptType -- meta data send from the web page. See more in /Web Plateform Design Files/Commands.html
        print("Running Script"+ script)
        #if script extendtion is '.py', then use python3, else use super-user linux command
        if(script[-2:]=='py'):
            call(['python3', '/home/pi'+script])
        else:
            call(['sudo','sh', '/home/pi'+script])

    # if command is send code data
    ## what is this??? no search result in all files
    if(command == "sendCodeStatus"):
        print("sendCodeStatus")

    #if command is change schedule
    if(command == "changeSchedule"):
        print("changeSchedule")
        startTimeStr = cmd.data['startTime'] #set startTimeStr to value from webpage
        endTimeStr = cmd.data['endTime'] #set endTimeStr to value from webpage
        startTime = datetime.datetime.strptime(startTimeStr,"%H:%M") # parse start time
        endTime = datetime.datetime.strptime(endTimeStr,"%H:%M") # parse end time
        onTimeHours = endTime.hour - startTime.hour # calculate how many hours are on
        onTimeMin = endTime.minute - startTime.minute # calcualte how many minus are on

    #calculate off time hours and minuits
        # if minute vlaue is larger than zero, hour value need to be offset by 1.
        if(onTimeMin>0):
            offTimeHours = 23 - onTimeHours
            offTimeMin = 60- onTimeMin
        elif(onTimeMin == 0):
            offTimeHours = 24-onTimeHours
            offTimeMin = 0
        ## This is consfusing, the value of 'onTimeMin' an be smaller than 0?
        else: ## seems wrong
            offTimeHours = 24 - onTimeHours
            onTimeHours = onTimeHours-1
            onTimeMin = 60 - abs(onTimeMin)
            offTimeMin = 60 - onTimeMin
        # modify witttpi schedule
        f =  open('/home/pi/wittyPi/schedules/schedule.wpi','w')
        f.write('BEGIN   2015-08-01 '+ startTimeStr+':00'+ '\n')
        f.write('END     2025-07-31 23:59:59'+ '\n')
        f.write('ON      H'+ str(onTimeHours) + ' M' + str(onTimeMin)+ '\n')
        f.write('OFF     H'+ str(offTimeHours)+ ' M' + str(offTimeMin))
        f.close

    # if command is image format
    if(command == "imageFormat"):
        print("imageFormat") # JPG or PNG or BMP
        if(cmd.data['imageFormat'] == '.jpg'):
            imageFormat = '.jpg'
            print("Format changed to:"+imageFormat)
        elif(cmd.data['imageFormat'] == '.png'):
            imageFormat = '.png'
            print("Format changed to:"+imageFormat)
        elif(cmd.data['imageFormat'] == '.bmp'):
            imageFormat = '.bmp'
            print("Format changed to:"+imageFormat)
        else:
            print("Incompatible format")

    # if command is change frames
    if(command == "changeFrames"):
        imageFrameRate =  int(cmd.data['frames'])

        print("Frame Rate changed to:", imageFrameRate)#range(10fps-30fps)

    # if command is send data
    if(command == "sendData"):
        print("SensorData Published")
        try:
            canopyTemp = 99 #mlx.object_temperature
            airTemp = 99 #mlx.ambient_temperature
            luxes = veml7700.light
        except OSError:
            pass
        #Verify values are correct
        while((canopyTemp >100) or (airTemp>100)):
            try:
                canopyTemp = 99 #mlx.object_temperature
                airTemp = 99 #mlx.ambient_temperature
            except OSError:
                pass
       # with open('/home/pi/test.txt','w+') as fout:
       #     wittyPi = Popen(["sudo","/home/pi/wittyPi/wittyPi.sh"],stdout=fout)
       #     sleep(15)
       #     os.system("sudo kill %s" %(wittyPi.pid,))
       #     tempLine = linecache.getline("/home/pi/test.txt",8)
       #     wittyPiTemp = float(tempLine[25:30])
       #     fout.close()
# set event data to be published
        data = {
            "DEVICE_ID": deviceId,
            "DEVICE_STATUS": "On",
            "LATITUDE": cameraLatitude,
            "LONGITUDE": cameraLongitude,
            "WATER_STRESS_LEVEL":waterStressLevel,
            "CANOPY_TEMPERATURE":'%.2f' % canopyTemp,
            "AIR_TEMPERATURE": '%.2f' % airTemp,
            "WITTYPI_TEMPERATURE":  random.randrange(30,40),
            "CPU_TEMPERATURE": cpuTemp,
            "LUXOMETER":luxes,
            "DATE_1":currDate,
            "TIME_1":currTime,
            #Add resolution
        }
# publish client event data using IBM Watson IoT PY SDK
        client.publishEvent("status","json", data)

    # if command is change resolution
    if(command == "changeResolution"):
        imageResolutionX = int(cmd.data['imageResolutionX'])
        imageResolutionY = int(cmd.data['imageResolutionY'])
        print("Resolution changed to:", imageResolutionX,"x", imageResolutionY) # set image resolution to the desire value pulled from web request's meta data


    # if command is set interval
    if cmd.commandId == "setInterval":
        #if user did not choose a interval value and hit setInterval
        if "interval" not in cmd.data:
            print("Error - command is missing required information: 'interval'")
        else:
        #if user try to send string value that is not a integer
            try:
                interval = int(cmd.data["interval"])
            except ValueError:
                print("Error - interval not an integer: ", cmd.data["interval"])
    elif cmd.commandId == "print":
        #if user send empty message
        if "message" not in cmd.data:
            print("Error - command is missing required information: 'message'")
        else:
            print(cmd.data["message"])

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
        client.commandCallback = commandProcessor # call client commandProcessor method
        client.connect() # Use MQTT connection to IBM Watson IoT Plateform for publishing events
    except Exception as e:         # store error message in 'e'
        print(str(e))         #  printout error message
        sys.exit(1)         # issue occured, program exit
    print("(Press Ctrl+C to disconnect)")

    curr = datetime.datetime.now()     #set 'curr' to current time.

    street = os.listdir('/home/pi/Pictures/')

    i=0 # 'i' is the image counter

## Everything from here onward is the same as commandProcessor code.....??
    while True:
        camera = PiCamera()  #Set camera parameters
        camera.rotation = 180
        camera.resolution = (imageResolutionX,imageResolutionY)
        camera.framerate = imageFrameRate
        currDate = datetime.datetime.now().strftime("%Y-%m-%d")
        currTime = datetime.datetime.now().strftime("%H:%M:%S")
        print("taking Image")
        camera.capture('/home/pi/images/' + currDate + '-' + currTime + imageFormat) #,resize=(imageWidth,imageHeight))
        camera.close()
        #im = imread('/home/pi/images/'+currDate+currTime+imageFormat)
        #Uncomment the above line to use the ML model on the taken image
        # set 'file' to image directory
        file = '/home/pi/Pictures/' + street[i]
        im = imread(file)
        # suspend current thread for 5 seconds
        sleep(5)
        print("resizing image")
        im_final = resize(im,(200,200))#Model was trained on 200x200 images

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
        cpuTemp = int(open('/sys/class/thermal/thermal_zone0/temp').read()) / 1e3 #CPU Temp
        cpu = gpz.CPUTemperature()
        cpuTemp = int(cpu.temperature)
        print("Sensor Reading")
        #Sensor Reading
        i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
        #mlx = adafruit_mlx90614.MLX90614(i2c)
        veml7700 = adafruit_veml7700.VEML7700(i2c)
        while True:
            try:
                canopyTemp = 99 #mlx.object_temperature
                airTemp = 99 #mlx.ambient_temperature
                luxes = veml7700.light
                break
            except OSError:
                pass
        #Verify values are correct
        while((canopyTemp >100) or (airTemp>100)):
            try:
                canopyTemp = 99 #mlx.object_temperature
                airTemp = 99 #mlx.ambient_temperature
            except OSError:
                pass
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
            "CANOPY_TEMPERATURE":'%.2f' % canopyTemp,
            "AIR_TEMPERATURE": '%.2f' % airTemp,
            "WITTYPI_TEMPERATURE": random.randrange(30,40), #wittyPiTemp,
            "CPU_TEMPERATURE": cpuTemp,
            "LUXOMETER":luxes,
            "DATE_1":currDate,
            "TIME_1":currTime,
        }
        print("Sending Data")
        client.publishEvent("status","json", data)

        with open('/home/pi/data.txt', 'a') as outfile:
            json.dump(data, outfile)
            outfile.write('\n')
        sleep(statusInterval)
