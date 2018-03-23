function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

class C {
  constructor({message: [head, ...tail], name}) {
    expect('a').toBe(head);
    assertArrayEquals(['b', 'c'], tail);
    expect('Error').toBe(name);
  }

  method({message: [head, ...tail], name}) {
    expect('a').toBe(head);
    assertArrayEquals(['b', 'c'], tail);
    expect('Error').toBe(name);
  }

  set x({message: [head, ...tail], name}) {
    expect('a').toBe(head);
    assertArrayEquals(['b', 'c'], tail);
    expect('Error').toBe(name);
  }
}

var c = new C(new MyError('abc'));
c.method(new MyError('abc'));
c.x = new MyError('abc');
