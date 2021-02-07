from picamera import PiCamera
import datetime
import time
from time import sleep
from subprocess import run

init_values = {
    "imageWidth" : 640,
    "imageHeight" : 480,
    "imageResolutionX" : 2592,  #(2592,1944) (1920,1080)
    "imageResolutionY" : 1944,
    "imageFormat" : '.jpg',
    "imageFrameRate" : 10,
    "statusInterval" : 720 
}


def capture_image():
    print("Camera Opening")
    camera = PiCamera()  #Set camera parameters
    print("setting rotation")
    camera.rotation = 180
    print("setting resolution")
    camera.resolution = (init_values.get("imageResolutionX"),init_values.get("imageResolutionY)")) #set camera resolution to 2592x1944
    camera.framerate = init_values.get("imageFrameRate")
    print("setting date")
    currDate = datetime.datetime.now().strftime("%d_%m_%y") #Set variable currDate to the datetime the image is taken
    currTime = datetime.datetime.now().strftime("%H_%M_%S") #set variable currTime to the time the image is taken
    print("capturing image")
    camera.capture('/home/pi/images/' + currDate + '_' + currTime + init_values.get("imageFormat")) #name the image in the format of Y-M-D-H-m-s in jpg, bmp, png
    camera.close() # turn off camera to release the camera resourse
    #camera.stop_preview()
    print("Image Taken")
    sleep(5)



def resize_image(height = init_values.get("imageHeight"), width = init_values.get("imageWidth")):
    image_size = {
        "image_Height" : height,
        "image_Width" : width
    }
    print("Images Resized to", image_size.get("image_Width"),"x", image_size.get("image_Height"),"y")
    return image_size

def change_resolution(new_x_resolution,new_y_resolution):
    new_resolution={
    "imageResolutionX" : new_x_resolution,
    "imageResolutionY" : new_y_resolution
    }
    print("Resolution changed to:", new_resolution.get("imageResolutionX") ,"x", new_resolution.get("imageResolytionY") , "y") # set image resolution to the desire value pulled from web request's meta data
    return new_resolution

def new_interval(interval = init_values.get("statusInterval")):
    statusInterval = interval # convert received minute interval to seconds
    print("Interval Changed to:", statusInterval,"seconds") # display interval value in seconds
    return statusInterval

def run_script(script_type):
        print("Running Script"+ script_type)
        #if script extendtion is '.py', then use python3, else use super-user linux command
        if(script_type[-2:]=='py'):
            run(['python3', '/home/pi'+ script_type])
        else:
            run(['sudo','sh', '/home/pi'+ script_type])


