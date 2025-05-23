@echo off
echo Running post-install script for react-native-reanimated-skeleton to support expo

REM Use PowerShell to replace import statements in all files under node_modules\react-native-reanimated-skeleton
powershell -Command "Get-ChildItem -Path .\node_modules\react-native-reanimated-skeleton -Recurse -File | ForEach-Object { (Get-Content $_.FullName) -replace 'import LinearGradient', 'import { LinearGradient}' -replace 'react-native-linear-gradient', 'expo-linear-gradient' | Set-Content $_.FullName }"
