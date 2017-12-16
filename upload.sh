#!/bin/bash

# remove old files
echo "deleting old folder"
s3cmd rm -r s3://$1/
echo "deleted old folder"

echo "syncing gzipped files"
s3cmd sync --progress --guess-mime-type --no-mime-magic --acl-public --reduced-redundancy --verbose --add-header 'Content-Encoding:gzip' dist/ s3://$1/
echo "syncing gzipped files complete"
