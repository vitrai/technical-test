// Test file with violations

// 1. Prettier violation - missing semicolon
const foo = "bar"

// 2. Prettier violation - double quotes instead of single
const baz = "qux";

// 3. let without reassignment
let unused = 'should be const';

console.log(foo, baz, unused);
