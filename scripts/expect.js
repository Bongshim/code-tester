export class Expect {
  constructor(actual) {
    this.actual = actual;
  }

  toMatch(regex) {
    if (!regex.test(this.actual)) {
      throw new Error(`Failed to match pattern: ${regex}`);
    }
    return true;
  }

  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${expected} but got ${actual}`);
    }
    return true;
  }

  toContain(substring) {
    if (!actual.includes(substring)) {
      throw new Error(`Expected code to contain "${substring}"`);
    }
    return true;
  }

  toBeType(type) {
    if (typeof actual !== type) {
      throw new Error(`Expected type ${type} but got ${typeof actual}`);
    }
    return true;
  }

  toBeGreaterThan(expected) {
    if (actual <= expected) {
      throw new Error(
        `Expected value greater than ${expected} but got ${actual}`
      );
    }
    return true;
  }

  toBeLessThan(expected) {
    if (actual >= expected) {
      throw new Error(`Expected value less than ${expected} but got ${actual}`);
    }
    return true;
  }

  toHaveLength(expected) {
    if (actual.length !== expected) {
      throw new Error(`Expected length ${expected} but got ${actual.length}`);
    }
    return true;
  }

  toBeFunction() {
    if (typeof actual !== 'function') {
      throw new Error('Expected a function');
    }
    return true;
  }

  toBeArray() {
    if (!Array.isArray(actual)) {
      throw new Error('Expected an array');
    }
    return true;
  }

  toContainElement(element) {
    if (!Array.isArray(actual) || !actual.includes(element)) {
      throw new Error(`Expected array to contain ${element}`);
    }
    return true;
  }

  toBeEmpty() {
    if (actual.length !== 0) {
      throw new Error('Expected to be empty');
    }
    return true;
  }
}
