@echo off
echo ========================================
echo Spring Boot Database Setup
echo ========================================
echo.

REM Change to the database directory
cd /d "%~dp0"

echo Creating Spring Boot compatible database...
echo.

REM Run the SQL file using MySQL
REM Adjust the MySQL path if needed
mysql -u root -proot < springboot-schema.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database created successfully
    echo ========================================
    echo.
    echo Database: digitmg_360_academy
    echo Tables created:
    echo   - students
    echo   - courses (55 courses inserted)
    echo   - enrollments
    echo.
    echo Your Spring Boot backend is now ready!
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to create database
    echo ========================================
    echo.
    echo Possible reasons:
    echo   1. MySQL is not running
    echo   2. Wrong username/password (currently using root/root)
    echo   3. MySQL is not in system PATH
    echo.
    echo To fix:
    echo   1. Make sure MySQL is running
    echo   2. Edit this file and update username/password
    echo   3. Or run the SQL file manually in MySQL Workbench
    echo.
)

pause
