#!/bin/bash

# Directory path
dir_path="/path/to/your/storage"

# Counter
count=0

# Loop over files in directory
for file in "$dir_path"/*
do
  # Break if count reaches 100
  if [ $count -eq 100 ]
  then
    break
  fi

  # Remove file
  rm "$file"

  # Increment counter
  ((count++))
done