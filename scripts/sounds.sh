#!/bin/sh

SILENCE=src/assets/audio/silence.mp3
REPLACE_FILES=src/assets/audio/\*.mp3

make_silence ()
{
  log overwrite
  cat $SILENCE | tee $REPLACE_FILES >/dev/null
  #find src/assets/audio/ -type f -iname \*.mp3 -exec cp src/assets/audio/silence.mp3 {} \;
  log untrack
  git update-index --assume-unchanged $REPLACE_FILES
  log done
}

restore_sound ()
{
  log checkout
  git checkout -- $REPLACE_FILES
  log retrack
  git update-index --no-assume-unchanged $REPLACE_FILES
  log done
}

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

log "$0"
indent_up

cmd="$1"
log "$cmd"
indent_up

shift 1
case "$cmd" in
silence) make_silence "$@" ;;
restore) restore_sound "$@" ;;
*) echo 'unrecognized command! "silence" and "restore" supported.'
esac
