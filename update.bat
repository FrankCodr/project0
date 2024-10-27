@echo off
echo Checking Git Status...
git status

echo.
echo Adding all changes...
git add .

echo.
set /p commit_message="hello everyone whatsupp "
git commit -m "%commit_message%"

echo.
echo Pushing changes...
git push

echo.
echo Done!
pause