#!/usr/bin/env python

import argparse

parser = argparse.ArgumentParser(description='Print the number of arguments.')
parser.add_argument('arguments', metavar='ARG', type=str, nargs='*', help='some arguments')
parser.add_argument('-v', '--verbose', action='store_true', help='verbose mode')
parser.add_argument('-m', dest='message', default='', help='custom message')
# + TODO: add '-v' option for verbose mode


args = parser.parse_args()

count = 0
 
if args.message != '':
	print(args.message)

for a in args.arguments:
	# + TODO: add '-v' option for verbose mode
	# and print each argument
	count += 1
	if (args.verbose) :
		print(a)

print(count)
