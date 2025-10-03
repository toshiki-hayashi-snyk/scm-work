const _ = require("lodash");
const minimist = require("minimist");
console.log("demo", _.shuffle([1,2,3]), minimist(process.argv.slice(2)));
