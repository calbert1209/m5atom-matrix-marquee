#!/bin/zsh

mcconfig -d -m -p esp32/m5atom_matrix \
  ssid="$AP_SSID" password="$AP_PASSWORD"