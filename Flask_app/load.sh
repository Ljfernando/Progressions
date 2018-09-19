#!/bin/bash

#########################
# Database credentials
#########################
user="root"
password=""
host="localhost"
db_name="UltimateGuitarTabs"


# SQL File
sql_file="../data/UltimateGuitarTabs.sql"


##########################
# Load SQL file into database
##########################
mysql -u $user -p $password -h $host $db_name < $sql_file
