#! /bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BOLD='\033[1m'
NC='\033[0m'

cd "./database"

if [ ! -f .env.local ]; then
  printf "${RED}${BOLD}.env.local could not be found in the database directory${NC}\n\n"
  printf "Please make sure you have copied over or renamed ${BOLD}database/.env.local${NC} and populated it.\n\n"
  exit
fi

set -o allexport
source .env.local
set +o allexport
if [ ${#PGHOST} == 0 ] || [ ${#PGUSER} == 0 ]; then
  printf "${RED}${BOLD}An expected value in .env.local could not be found.${NC}\n\n"
  printf "Please check your ${BOLD}.env.local${NC} file and make sure all expected fields are populated.\n\n"
fi

printf "${GREEN}${BOLD}.env.local file loaded successfully. Running SQL scripts...${NC}\n\n"

psql -d postgres -f $PWD/sql/createDb.sql -v v1="$PGDATABASE"
psql -f $PWD/sql/createTables.sql

printf "\n${GREEN}${BOLD}Script complete!${NC}\n\n"