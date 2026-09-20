@echo off
cd /d "%~dp0"
start "Daily Dashboard" http://localhost:8080
py -m http.server 8080
