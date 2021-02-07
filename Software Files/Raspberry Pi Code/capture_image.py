from picamera import PiCamera
import datetime
import time
from time import sleep

imageWidth = 640
imageHeight = 480
imageResolutionX = 2592  #(2592,1944) (1920,1080)
imageResolutionY = 1944
imageFormat = '.jpg'
imageFrameRate = 10

def change_resolution(new_resolution_X, new_resolution_Y):
        imageResolutionX = new_resolution_X
        imageResolutionY = new_resolution_Y
        print("Resolution changed to:", imageResolutionX,"x", imageResolutionY,"y") # set image resolution to the desire value pulled from web request's meta data


def capture_image():
    print("Camera Opening")
    camera = PiCamera()  #Set camera parameters
    print("setting rotation")
    camera.rotation = 180
    print("setting resolution")
    camera.resolution = (imageResolutionX,imageResolutionY) #set camera resolution to 2592x1944
    camera.framerate = imageFrameRate
    print("setting date")
    currDate = datetime.datetime.now().strftime("%Y-%m-%d") #Set variable currDate to the datetime the image is taken
    currTime = datetime.datetime.now().strftime("%H:%M:%S") #set variable currTime to the time the image is taken
    print("capturing image")
    camera.capture('/home/pi/images/' + currDate +'-' + currTime + imageFormat) #name the image in the format of Y-M-D-H-m-s in jpg, bmp, png
    camera.close() # turn off camera to release the camera resourse
    #camera.stop_preview()
    print("Image Taken")
    sleep(5)
