#!/bin/bash
set -e
forever stopall
cd /var/www/myapp
forever start dist/main.js