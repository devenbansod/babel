var _deep$obj, _deep$obj2, _deep$obj3, _deep$obj4;

var x = 0;
var sets = 0;
var obj = {
  get x() {
    return x;
  },

  set x(value) {
    sets++;
    x = value;
  }

};
expect(obj.x || (obj.x = 1)).toBe(1);
expect(sets).toBe(1);
expect(obj.x || (obj.x = 2)).toBe(1);
expect(sets).toBe(1);
expect(obj.x && (obj.x = 0)).toBe(0);
expect(sets).toBe(2);
expect(obj.x && (obj.x = 3)).toBe(0);
expect(sets).toBe(2);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }

};
expect((_deep$obj = deep.obj).x || (_deep$obj.x = 1)).toBe(1);
expect(gets).toBe(1);
expect((_deep$obj2 = deep.obj).x || (_deep$obj2.x = 2)).toBe(1);
expect(gets).toBe(2);
expect((_deep$obj3 = deep.obj).x && (_deep$obj3.x = 0)).toBe(0);
expect(gets).toBe(3);
expect((_deep$obj4 = deep.obj).x && (_deep$obj4.x = 3)).toBe(0);
expect(gets).toBe(4);
