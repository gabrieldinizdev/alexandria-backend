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

DELAY=60

logger "initializing replica set"
echo -e "\n\n\n\n"

mongosh --port 3010 <<EOF
var replicaSetName = "rset";
var config = {
  "_id": replicaSetName,
  "version": 1,
  "members": [
    {
        "_id": 1,
        "host": "mongo1:3010",
        "priority": 5
    },
    {
      "_id": 2,
      "host": "mongo2:3011",
      "priority": 3
    },
    {
      "_id": 3,
      "host": "mongo3:3012",
      "priority": 1
    }
  ]
};

rs.initiate(config, { force: true });

exit;
EOF

echo -e "\n"
logger "waiting for ${DELAY} seconds for replicaset configuration to be applied"
echo -e "\n\n\n\n"

sleep $DELAY

echo -e "\n"
logger "creating admin user"
echo -e "\n\n\n\n"

mongosh --port 3010 <<EOF
use admin

db.createUser({
  user: "${DB_ROOT_USER}",
  pwd: "${DB_ROOT_PASSWORD}",
  roles: [{ role: 'root', db: 'admin' }],
});

exit;
EOF
