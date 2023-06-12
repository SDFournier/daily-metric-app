#!/bin/bash
set -e
forever stopall
forever start dist/main.js