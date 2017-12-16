#!/bin/bash

# remove map files
find dist -name '*.map' -exec rm '{}' \; 

# compress the files
gzip -r dist/

# change their name back
find dist/ -exec rename '.gz' '' '{}' \;
echo "gzipping successful"
