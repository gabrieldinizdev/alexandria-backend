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

container_name="repl-01"

is_container_running() {
    docker inspect -f '{{.State.Running}}' "$container_name" 2>/dev/null
}

if [ "$#" -ne 1 ]; then
  echo "\n"
  logger "missing arguments" "error"
  logger "usage: npm run script:replication -- [shutdown|none]" "error"
  echo "\n\n\n\n"
  return 1
fi

if [ "$1" != "none" ] && [ $1 != "shutdown" ]; then
  echo "\n"
  logger "missing arguments" "error"
  logger "usage: npm run script:replication -- [shutdown|none]" "error"
  echo "\n\n\n\n"
  return 1
fi

if [ $1 = "shutdown" ]; then
  echo "\n"
  logger "shutdown docker application" "warn"

  docker compose -f ./.docker/docker-compose.yml down
  echo "\n\n\n\n"

  sleep 5
fi

logger "initializing docker application" "info"

docker compose -f ./.docker/docker-compose.yml up -d

logger "waiting for containers to go up" "log"

while ! is_container_running; do
    sleep 2
done

logger "container is running" "log"

logger "waiting for database get ready" "log"

sleep 10

logger "executing replica init" "info"

docker exec -t "$container_name" /scripts/mongo/rs-init.sh

echo "\n\n\n\n"
logger "finished script successfully" "info"
echo "\n\n\n\n"
