#! /bin/bash

BLUE='\033[0;34m'
NC='\033[0m'

echo "${BLUE}==>1. Clear cache and node modules${NC}"

yarn cache clean

rf -rf yarn.lock yarn-error.log node_modules dist

echo "${BLUE}==>2. Install package and build${NC}"

yarn install

yarn build

echo "${BLUE}==>3. Restart docker services${NC}"