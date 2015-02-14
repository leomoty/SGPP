tsc --target ES5 --removeComments --out temp.js SGv2+\App.ts

pause

java -jar yuicompressor-2.4.8.jar --type js -o temp2.js temp.js
del temp.js

del Steamgifts++.js
type Monkeyheader.js >>Steamgifts++.js
type temp2.js >>Steamgifts++.js
del temp2.js