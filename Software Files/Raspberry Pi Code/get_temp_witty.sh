### This will provide witty pi temperature ###
[ -z $BASH ] && { exec bash "$0" "$@" || exit; }
#!/bin/bash

source ./witty_temp.sh

temperature="$(get_temperature)"
echo "$temperature"
