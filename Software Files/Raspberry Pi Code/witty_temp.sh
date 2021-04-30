### This is the shell script that will provide witty pi temperature######### 
### This scipt is from witty pi github repo, ref:"https://github.com/uugear/Witty-Pi-2/tree/master/wittyPi"##
#!/bin/bash
# halt by GPIO-4 (BCM naming)
HALT_PIN=4

# LED on GPIO-17 (BCM naming)
LED_PIN=17
dec2hex()
{
  printf "0x%02x" $1
}
i2c_read()
{
  local retry=0
  if [ $# -gt 3 ] ; then
    retry=$4
  fi
  local result=$(i2cget -y $1 $2 $3)
  if [[ $result =~ ^0x[0-9a-fA-F]{2}$ ]] ; then
    echo $result;
  else
    retry=$(( $retry + 1 ))
    if [ $retry -eq 4 ] ; then
      log "I2C read $1 $2 $3 failed (result=$result), and no more retry."
    else
      sleep 1
      log2file "I2C read $1 $2 $3 failed (result=$result), retrying $retry ..."
      i2c_read $1 $2 $3 $retry
    fi
  fi
}

i2c_write()
{
  local retry=0
  if [ $# -gt 4 ] ; then
    retry=$5
  fi
  i2cset -y $1 $2 $3 $4
  local result=$(i2c_read $1 $2 $3)
  if [ "$result" != $(dec2hex "$4") ] ; then
    retry=$(( $retry + 1 ))
    if [ $retry -eq 4 ] ; then
      log "I2C write $1 $2 $3 $4 failed (result=$result), and no more retry."
    else
      sleep 1
      log2file "I2C write $1 $2 $3 $4 failed (result=$result), retrying $retry ..."
      i2c_write $1 $2 $3 $4 $retry
    fi
  fi
}

get_temperature()
{
  local ctrl=$(i2c_read 0x01 0x68 0x0E)
  i2c_write 0x01 0x68 0x0E $(($ctrl|0x20))
  sleep 0.2
  local t1=$(i2c_read 0x01 0x68 0x11)
  local t2=$(i2c_read 0x01 0x68 0x12)
  local sign=$(($t1&0x80))
  local c=''
  if [ $sign -ne 0 ] ; then
    c+='-'
    c+=$((($t1^0xFF)+1))
  else
    c+=$(($t1&0x7F))
  fi
  c+='.'
  c+=$(((($t2&0xC0)>>6)*25))
  echo -n "$c$(echo $'\xc2\xb0'C)"
  if hash awk 2>/dev/null; then
    local f=$(awk "BEGIN { print $c*1.8+32 }")
    echo " / $f$(echo $'\xc2\xb0'F)"
  else
    echo ''
  fi
}

