#!/usr/bin/env bash
while [ 0 -le 1 ] 
do
	curl --request GET http://localhost:5000/closedoldorders
	echo "---------------"
	sleep 3600
done
