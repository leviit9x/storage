#!/bin/bash

set -e

mongo <<EOF
use admin
db.createUser({
  user: '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{ role: 'root', db: 'storage' }]
})
EOF
