# Python script to connect Hologram Nova to internet as gateway for Raspberry Pi
# Project 04 - IoT Smart Camera
'''TODO: Import hologram SDK library here'''

# Create Hologram class network object
hologram = HologramCloud(dict(), network='cellular')
# Connect to the Hologram Global Network
result = hologram.network.connect()
