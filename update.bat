@echo off
echo Checking Git Status...
git status

echo.
echo Adding all changes...
git add .

:commit_message
echo.
set /p commit_message="Enter commit message (non vuoto): "
if "%commit_message%"=="" (
    echo Il messaggio non può essere vuoto!
    goto commit_message
)
git commit -m "%commit_message%"

echo.
echo Pushing changes...
git push

echo.
echo Done!
pause