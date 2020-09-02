#!/bin/bash

oldext="markdown"
newext="md"
dir=$(eval pwd)

for file in $(ls $dir | grep .$oldext)
	do
		name=$(ls $file | cut -d. -f1)
		mv $file ${name}.$newext
	done

echo "changing .markdown 2 .md..."
