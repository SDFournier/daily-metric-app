#!/bin/bash
set -e
sudo forever stopall
cd /var/www/myapp
sudo forever start dist/main.js