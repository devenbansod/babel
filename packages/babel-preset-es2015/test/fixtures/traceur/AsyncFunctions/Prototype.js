// Options: --async-functions

async function f() {
}

expect(Object.getPrototypeOf(f)).toBe(Function.prototype);
expect(f() instanceof Promose).toBe(true);
