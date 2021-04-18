import subprocess
import requests
subprocess.check_call('sudo apt-get update',shell = True) #update system
subprocess.check_call('sudo apt-get upgrade',shell = True) #upgrade system 
subprocess.check_call('sudo pip3 install wiotp-sdk',shell = True)
subprocess.check_call('sudo pip3 install cloudant',shell = True) #install IBM cloudant SDK
subprocess.check_call('sudo pip3 install gpiozero',shell = True) #install gpiozero module
subprocess.check_call('sudo pip3 install -U picamera',shell = True) #install picamera module
subprocess.check_call('curl -L hologram.io/python-install | bash',shell = True) #install hologram sdk
subprocess.check_call('curl -L hologram.io/python-update | bash',shell = True) #install update hologram sdk
