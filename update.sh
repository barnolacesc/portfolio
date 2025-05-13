#!/bin/bash

# This script helps with common maintenance tasks for the portfolio website

echo "DevOps Portfolio Website Updater"
echo "================================"
echo

# Menu options
echo "Please select an option:"
echo "1. Push changes to GitHub"
echo "2. Update CV PDF"
echo "3. Update profile photo"
echo "4. View local website"
echo "5. Exit"
echo

read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo "Pushing changes to GitHub..."
    git add .
    read -p "Enter commit message: " message
    git commit -m "$message"
    git push origin main
    echo "Changes pushed successfully!"
    ;;
  2)
    echo "Updating CV PDF..."
    read -p "Enter path to new CV PDF file: " cvpath
    if [ -f "$cvpath" ]; then
      cp "$cvpath" assets/francesc_barnola_cv.pdf
      echo "CV updated successfully!"
    else
      echo "Error: File not found"
    fi
    ;;
  3)
    echo "Updating profile photo..."
    read -p "Enter path to new profile photo: " photopath
    if [ -f "$photopath" ]; then
      cp "$photopath" assets/perfil.jpeg
      echo "Profile photo updated successfully!"
    else
      echo "Error: File not found"
    fi
    ;;
  4)
    echo "Opening website in default browser..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
      open index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
      xdg-open index.html
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
      start index.html
    else
      echo "Unable to open browser automatically. Please open index.html manually."
    fi
    ;;
  5)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid option. Please try again."
    ;;
esac 