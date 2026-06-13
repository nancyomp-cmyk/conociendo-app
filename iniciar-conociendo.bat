@echo off
:: =====================================================
:: Archivo: iniciar-conociendo.bat
:: Proyecto: Conociendo.com
:: Descripcion: Inicia el backend Laravel y el frontend
::              React simultaneamente en dos ventanas CMD
:: =====================================================

echo Iniciando Conociendo.com...
echo.

:: Iniciar Backend Laravel en una ventana nueva
start "Backend Laravel - Puerto 8000" cmd /k "cd /d C:\Users\nancy\Desktop\NANCY_SENA\GA8-220501096-AA1-EV01\conociendo-api && set PATH=C:\laragon\bin\php\php8.2.12;%PATH% && php artisan serve"

:: Esperar 3 segundos para que Laravel arranque primero
timeout /t 3 /nobreak > nul

:: Iniciar Frontend React en otra ventana nueva
start "Frontend React - Puerto 5173" cmd /k "cd /d C:\Users\nancy\Desktop\NANCY_SENA\GA8-220501096-AA1-EV01\conociendo-frontend && npm run dev"

echo.
echo Servidores iniciados:
echo   Backend  -> http://localhost:8000
echo   Frontend -> http://localhost:5173
echo.
echo Cierra las ventanas CMD para detener los servidores.
pause