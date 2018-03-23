function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

var object = {
  set x({message: [head, ...tail], name}) {
    expect(head).toBe('a');
    assertArrayEquals(['b', 'c'], tail);
    expect(name).toBe('Error');
  }
};

object.x = new MyError('abc');
