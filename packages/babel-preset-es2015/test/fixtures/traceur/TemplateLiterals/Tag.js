// Options: --block-binding

{
  function expose(callSite, var_args) {
    expect(Array.isArray(callSite)).toBe(true);
    expect(Object.isFrozen(callSite)).toBe(true);
    var rawDescr = Object.getOwnPropertyDescriptor(callSite, 'raw');
    expect(rawDescr !== undefined).toBe(true);
    expect('value' in rawDescr).toBe(true);
    expect(rawDescr.enumerable).toBe(false);
    expect(rawDescr.writable).toBe(false);
    expect(rawDescr.configurable).toBe(false);
    expect(Object.isFrozen(callSite.raw)).toBe(true);
    expect(Array.isArray(callSite.raw)).toBe(true);
    expect(Object.isFrozen(callSite.raw)).toBe(true);
    expect(callSite.raw).toHaveLength(callSite.length);

    // The number of the literal portions is always same or one greater than the
    // number of substitutions
    var literalPortionCount = callSite.raw.length;
    var substitutionCount = arguments.length - 1;
    expect(literalPortionCount == substitutionCount ||
               literalPortionCount == substitutionCount + 1).toBe(true);

    return arguments;
  }

  let x = 3;
  let y = 5;

  expect(expose``).toHaveLength(1);
  expect(expose`a`).toHaveLength(1);
  expect(expose`a${x}`).toHaveLength(2);
  expect(expose`a${x} b`).toHaveLength(2);
  expect(expose`a${x} ${y}`).toHaveLength(3);
  expect(expose`${x}${y}`).toHaveLength(3);
  expect(expose`${x}a`).toHaveLength(2);

  expect(expose``[0]).toHaveLength(1);
  expect(expose``[0].raw).toHaveLength(1);

  assertArrayEquals(['a'], expose`a`[0].raw);
  assertArrayEquals(['a'], expose`a`[0]);

  assertArrayEquals(['\\n'], expose`\n`[0].raw);
  assertArrayEquals(['\n'], expose`\n`[0]);

  assertArrayEquals(['\\r'], expose`\r`[0].raw);
  assertArrayEquals(['\r'], expose`\r`[0]);

  assertArrayEquals(['\\f'], expose`\f`[0].raw);
  assertArrayEquals(['\f'], expose`\f`[0]);

  assertArrayEquals(['\\b'], expose`\b`[0].raw);
  assertArrayEquals(['\b'], expose`\b`[0]);

  assertArrayEquals(['\\u2028'], expose`\u2028`[0].raw);
  assertArrayEquals(['\u2028'], expose`\u2028`[0]);

  assertArrayEquals(['\\u2029'], expose`\u2029`[0].raw);
  assertArrayEquals(['\u2029'], expose`\u2029`[0]);

  assertArrayEquals(['a', 'b'], expose`a${x}b`[0].raw);
  assertArrayEquals(['a', 'b'], expose`a${x}b`[0]);

  // These have tab characters in them.
  assertArrayEquals(['\t', '\\t'], expose`	${x}\t`[0].raw);
  assertArrayEquals(['\t', '\t'], expose`	${x}\t`[0]);

  assertArrayEquals(['\n', '\\n'], expose`
${x}\n`[0].raw);
  assertArrayEquals(['\n', '\n'], expose`
${x}\n`[0]);

  // These contains the ES new line chars \u2028 and \u2029
  assertArrayEquals(['\u2028', '\\u2028'], expose` ${x}\u2028`[0].raw);
  assertArrayEquals(['\u2028', '\u2028'], expose` ${x}\u2028`[0]);

  assertArrayEquals(['\u2029', '\\u2029'], expose` ${x}\u2029`[0].raw);
  assertArrayEquals(['\u2029', '\u2029'], expose` ${x}\u2029`[0]);

  assertArrayEquals(['a/*b*/c'], expose`a/*b*/c`[0].raw);
  assertArrayEquals(['a/*b*/c'], expose`a/*b*/c`[0]);

  assertArrayEquals(['a'], expose/* comment */`a`[0].raw);
  assertArrayEquals(['a'], expose/* comment */`a`[0]);
};
