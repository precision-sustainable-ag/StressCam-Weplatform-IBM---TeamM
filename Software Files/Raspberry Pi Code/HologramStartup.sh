#!/bin/bash

echo 'Setting up Hologram Nova as Gateway'
sudo hologram modem Connect

echo 'Running Python Script to connect'
python3 InternetConnect.py
