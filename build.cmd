tsc --target ES5 --removeComments --out temp.js SGPP\App.ts

pause

java -jar yuicompressor-2.4.8.jar --type js -o temp2.js temp.js
del temp.js

del SGPP.user.js
type Monkeyheader.js >>SGPP.user.js
type temp2.js >>SGPP.user.js
del temp2.js