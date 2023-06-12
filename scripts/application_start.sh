#!/bin/bash
set -e
sudo forever stopall
sudo cd /var/www/myapp
sudo forever start dist/main.js