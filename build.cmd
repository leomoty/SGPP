@echo off

echo Steamgifts++ Buildscript
echo ________________________
echo.

echo compiling Typescript.....
@echo on
tsc --target ES5 --removeComments --out temp.js SGPP\App.ts
@echo off
echo.


:selection1

set /P selection=Do you want to compress the script? [Y/N]
if /I "%selection%"=="Y" goto selection2
if /I "%selection%"=="y" goto selection2
if /I "%selection%"=="N" (
	ren temp.js temp2.js
	goto concat
)
if /I "%selection%"=="n" (
	ren temp.js temp2.js
	goto concat
)
echo.

goto selection1


:selection2

echo.
set /P selection=Do you want to obfuscate the script? [Y/N]
if /I "%selection%"=="Y" goto obfuscate
if /I "%selection%"=="y" goto obfuscate
if /I "%selection%"=="N" goto compress
if /I "%selection%"=="n" goto compress
echo.

goto selection2

:obfuscate
echo compressing and obfuscating the script.....
java -jar yuicompressor-2.4.8.jar --type js -o temp2.js temp.js
del temp.js
goto concat

:compress
echo compressing the script.....
java -jar yuicompressor-2.4.8.jar --type js --nomunge -o temp2.js temp.js
del temp.js
goto concat


:concat
del SGPP.user.js
echo.
echo concatenating the monkeyheader and the script.....
type Monkeyheader.js >>SGPP.user.js
type temp2.js >>SGPP.user.js
del temp2.js