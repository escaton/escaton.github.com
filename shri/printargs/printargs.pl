#!/usr/bin/env perl

use strict;
use Getopt::Long;
use Pod::Usage;

my $help;
my $verbose = 0;
my $message = '';

@ARGV and GetOptions(
	"h" => \$help,
	"v" => \$verbose,
	"m:s" => \$message,
	# + TODO: add '-v' option for verbose mode
) or pod2usage(1);
pod2usage(-verbose => 2, -exitval => 2) if $help;

my $count = 0;

if($message ne "") {
	print($message . "\n");
}

foreach(@ARGV) {
	# + TODO: add '-v' option for verbose mode
	# and print each argument
	if ($verbose ne 0) {
		print(@ARGV[$count] . "\n");
	}
	$count++;
}

print($count . "\n");

__END__

=head1 NAME

	printargs.pl - Print the number of arguments.

=head1 SYNOPSIS

	printargs.pl [options] [arguments]

=head1 OPTIONS

	-h		Show help message.

	-v		Verbose mode.

	-m MSG	Specify a custom message.


=head1 EXAMPLE

	printargs.pl a b c

	printargs.pl -v a b c

	printargs.pl -m 'Arguments count: ' a b c

	printargs.pl -h
