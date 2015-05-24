tsc --target ES5 --removeComments --out temp.js SGPP\App.ts

del SGPP.user.js
type Monkeyheader.js >>SGPP.user.js
type temp.js >>SGPP.user.js
del temp.js