#!/bin/bash
set -e
yum update -y
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
yum install -y nodejs
# Install forever globally
sudo npm install -g forever