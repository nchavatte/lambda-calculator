**lambda-calculator** is a simple parsing and normalization library for lambda calculus.

## Getting started

### Install for node.js

```
$ npm install lambda-calculator
```

### Use API in your JS project

```javascript
var calculate = require("lambda-calculator");
console.log(calculate("(x=>(x)y)z"));
```

output :
```
(z) y
```