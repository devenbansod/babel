var head = 'head';
var tail = 'tail';
var name = 'name';

function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

try {
  throw new MyError('abc');
} catch ({message: [head, ...tail], name}) {
  expect('a').toBe(head);
  assertArrayEquals(['b', 'c'], tail);
  expect('Error').toBe(name);
}

expect('head').toBe(head);
expect('tail').toBe(tail);
expect('name').toBe(name);

expect(() => {
  try {
    throw [0];
  } catch ([innerX]) {

  }

  innerX;
}).toThrow(ReferenceError);
