tsc --target ES5 --removeComments --out temp.js SGPP\App.ts

del SGPP-dev.user.js
type Monkeyheader.js >>SGPP-dev.user.js
type temp.js >>SGPP-dev.user.js
del temp.js