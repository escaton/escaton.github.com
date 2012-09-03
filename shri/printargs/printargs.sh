#!/usr/bin/env bash

usage() {
cat << EOF
Usage: printargs.sh [OPTIONS] [ARGUMENTS]
  Print the number of arguments.

OPTIONS:
  -h      print help message
  -m MSG  custom message
  -v 	  verbose mode

Examples:
  printargs.sh a b c
  printargs.sh -m 'Arguments count: ' a b c
  printargs.sh -h
  printargs.sh -v a b c

EOF
}

while getopts “hvm:” OPTION # + TODO: add '-v' option for verbose mode
do
	case $OPTION in
		h)
			usage
			exit 1
			shift;;
		v)
			VERBOSE=1
			shift;;
		m)
			MESSAGE=$OPTARG
			shift;shift;;
	esac
done

COUNT=0

if [[ "$MESSAGE" != "" ]]; then
	echo $MESSAGE
fi

for ARG in $@; do
	# + TODO: add '-v' option for verbose mode
	# and print each argument
	let COUNT+=1
	if [[ "$VERBOSE" == "1" ]]; then 
		echo $ARG
	fi
done

echo $COUNT
