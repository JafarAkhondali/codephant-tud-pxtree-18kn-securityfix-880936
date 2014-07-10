#!/bin/sh

DIRNAME="$(dirname "$0")"
SRCDIR="src"
PIDFILE="node-server.pid"
SERVER_SCRIPT="$DIRNAME"/static_server.js

CurrentIndent=''
IndentChars='    '

log ()
{
  echo "$CurrentIndent""$*"
}

indent_up ()
{
  CurrentIndent="$CurrentIndent""$IndentChars"
}

indent_down ()
{
  local iLen cLen
  iLen=$(echo -n "$IndentChars" | wc -c)
  cLen=$(echo -n "$CurrentIndent" | wc -c)
  CurrentIndent=$(echo -n "$CurrentIndent" | head -c $((cLen - iLen)) )
}

start_node ()
{
  if [ -f "$PIDFILE" ]
  then
    log server already running
  else
    node "$SERVER_SCRIPT" -d "$SRCDIR" &
    echo "$!" > "$PIDFILE"
  fi
}

stop_node ()
{
  if [ ! -f "$PIDFILE" ]
  then
    log server is not running
  else
    kill $(cat "$PIDFILE")
    rm "$PIDFILE"
  fi
}

log "$0"
indent_up

cmd="$1"
shift 1
log "$cmd"
indent_up

case "$cmd" in
start) start_node"$@" ;;
stop) stop_node "$@" ;;
*) echo 'unrecognized command! "start" and "stop" supported.'
esac
