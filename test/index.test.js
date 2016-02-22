var test = require('tape');
var index = require('../src/index.js');

test("testing we get the comments in the issue object", function (t) {
    console.log(index);
    t.ok( index.getData(), "hello");
    t.end();
});
