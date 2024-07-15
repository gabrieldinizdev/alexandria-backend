#!/bin/bash

logger() {
  local message="$1"
  local type="$2"

  local timestamp="$(date -d @$(date +%s) +'%Y-%m-%d %H:%M:%S')"

  case "$type" in
    "error")
      echo "\e[36m$timestamp\e[m \e[31;1m[ ERROR ]\e[0m - $message"
      ;;
    "debug")
      echo "\e[36m$timestamp\e[m \e[35;1m[ DEBUG ]\e[0m - $message"
      ;;
    "log")
      echo "\e[36m$timestamp\e[m \e[32;1m[ LOG ]\e[0m - $message"
      ;;
    "info")
      echo "\e[36m$timestamp\e[m \e[34;1m[ INFO ]\e[0m - $message"
      ;;
    "warn")
      echo "\e[36m$timestamp\e[m \e[33;1m[ WARN ]\e[0m - $message"
      ;;
    *)
      echo "$timestamp - $message"
      ;;
  esac
}

if [ "$#" -ne 4 ]; then
  echo "\n"
  logger "missing arguments" "error"
  logger "usage: npm run script:dumping -- \"container_name\" \"uri\" \"collection\" \"namespace_include\"" "error"
  logger "example usage:" "error"
  logger "npm run script:dumping -- \"replica-01\" \"mongodb://<username>:<password>@<host>:<port>/<database>\" \"my.collection\" \"55TELECOM.*\"" "error"
  echo "\n\n\n\n"
  return 1
fi

container_name="$1"
uri="$2"
collection="$3"
ns_include="$4"

outdir="/dump"

logger "initializing dump" "info"

docker exec -t "$container_name" mongodump \
  --uri="$uri" \
  --authenticationDatabase="admin" \
  --collection="$collection" \
  --out="$outdir"

logger "initializing restoring" "info"

docker exec -t "$container_name" mongorestore \
  --nsInclude="$ns_include" \
  "$outdir"

logger "cleaning up dump folder" "info"

docker exec -t "$container_name" rm -rf "$outdir"
