require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs',
  },
});

const testOutput = document.getElementById('test-output');
const docPanel = document.getElementById('documentation-panel');
const toggleDocsBtn = document.getElementById('toggleDocs');

const METHOD_DOCS = {
  toMatch:
    'Tests if value matches a regular expression pattern. Example: expect(code).toMatch(/function/)',
  toBe: 'Tests strict equality between values. Example: expect(result).toBe(42)',
  toContain:
    'Tests if string contains a substring. Example: expect(code).toContain("function")',
  toBeType:
    'Tests the type of a value. Example: expect(variable).toBeType("number")',
  toBeGreaterThan:
    'Tests if a number is greater than expected. Example: expect(value).toBeGreaterThan(5)',
  toBeLessThan:
    'Tests if a number is less than expected. Example: expect(value).toBeLessThan(10)',
  toHaveLength:
    'Tests the length of an array or string. Example: expect(array).toHaveLength(3)',
  toBeFunction:
    'Tests if value is a function. Example: expect(fn).toBeFunction()',
  toBeArray: 'Tests if value is an array. Example: expect(value).toBeArray()',
  toContainElement:
    'Tests if array contains specific element. Example: expect(array).toContainElement(5)',
  toBeEmpty:
    'Tests if array or string is empty. Example: expect(array).toBeEmpty()',
};

toggleDocsBtn.addEventListener('click', () => {
  docPanel.style.display = docPanel.style.display === 'none' ? 'block' : 'none';
});

function log(message, type = '') {
  testOutput.innerHTML += `<span class="${type}">${message}</span>\n`;
}

const VALID_METHODS = [
  'toMatch',
  'toBe',
  'toContain',
  'toBeType',
  'toBeGreaterThan',
  'toBeLessThan',
  'toHaveLength',
  'toBeFunction',
  'toBeArray',
  'toContainElement',
  'toBeEmpty',
];

function validateTestMethod(methodName) {
  if (!VALID_METHODS.includes(methodName)) {
    log(
      `Invalid test method: '${methodName}'. Available methods are: ${VALID_METHODS.join(
        ', '
      )}`,
      'fail'
    );
    throw new Error(
      `Invalid test method: '${methodName}'. Available methods are: ${VALID_METHODS.join(
        ', '
      )}`
    );
  }
}

function validateTestCode(testCode) {
  const methodCallRegex = /expect\([^)]*\)\.(\w+)/g;
  let match;

  while ((match = methodCallRegex.exec(testCode)) !== null) {
    const methodName = match[1];
    validateTestMethod(methodName);
  }
}

require(['vs/editor/editor.main'], function () {
  const codeEditor = monaco.editor.create(
    document.getElementById('code-editor'),
    {
      value:
        '// Write your code here...\nlet name = "John";\nlet age = 25;\nlet isDaytime = true;',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
    }
  );

  const testEditor = monaco.editor.create(
    document.getElementById('test-editor'),
    {
      value:
        '// Use userCode to reference the code input\nexpect(userCode).toMatch(/let\\s+name\\s*=\\s*".*";/);\nexpect(userCode).toMatch(/let\\s+age\\s*=\\s*\\d+;/);\nexpect(userCode).toMatch(/let\\s+isDaytime\\s*=\\s*(true|false);/);',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
    }
  );

  function expect(actual) {
    return {
      toMatch(regex) {
        if (!regex.test(actual)) {
          throw new Error(`Failed to match pattern: ${regex}`);
        }
        return true;
      },

      toBe(expected) {
        if (actual !== expected) {
          throw new Error(`Expected ${expected} but got ${actual}`);
        }
        return true;
      },

      toContain(substring) {
        if (!actual.includes(substring)) {
          throw new Error(`Expected code to contain "${substring}"`);
        }
        return true;
      },

      toBeType(type) {
        if (typeof actual !== type) {
          throw new Error(`Expected type ${type} but got ${typeof actual}`);
        }
        return true;
      },

      toBeGreaterThan(expected) {
        if (actual <= expected) {
          throw new Error(
            `Expected value greater than ${expected} but got ${actual}`
          );
        }
        return true;
      },

      toBeLessThan(expected) {
        if (actual >= expected) {
          throw new Error(
            `Expected value less than ${expected} but got ${actual}`
          );
        }
        return true;
      },

      toHaveLength(expected) {
        if (actual.length !== expected) {
          throw new Error(
            `Expected length ${expected} but got ${actual.length}`
          );
        }
        return true;
      },

      toBeFunction() {
        if (typeof actual !== 'function') {
          throw new Error('Expected a function');
        }
        return true;
      },

      toBeArray() {
        if (!Array.isArray(actual)) {
          throw new Error('Expected an array');
        }
        return true;
      },

      toContainElement(element) {
        if (!Array.isArray(actual) || !actual.includes(element)) {
          throw new Error(`Expected array to contain ${element}`);
        }
        return true;
      },

      toBeEmpty() {
        if (actual.length !== 0) {
          throw new Error('Expected to be empty');
        }
        return true;
      },
    };
  }

  function runTests() {
    testOutput.innerHTML = '';
    const userCode = codeEditor.getValue();
    const testCode = testEditor.getValue();

    validateTestCode(testCode);

    try {
      eval(testCode);
      log('✓ All tests passed!', 'pass');
    } catch (error) {
      log(`✗ ${error.message}`, 'fail');
    }
  }

  document.getElementById('runBtn').addEventListener('click', runTests);
  document
    .getElementById('clearBtn')
    .addEventListener('click', () => (testOutput.innerHTML = ''));
  codeEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runTests);
  testEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runTests);
});

function createDocumentationPanel() {
  const header = document.createElement('h3');
  header.textContent = 'Available Test Methods';
  docPanel.appendChild(header);

  const methodList = document.createElement('ul');
  VALID_METHODS.forEach((method) => {
    const item = document.createElement('li');
    const methodName = document.createElement('strong');
    methodName.textContent = `${method}()`;
    const description = document.createElement('p');
    description.textContent = METHOD_DOCS[method];

    item.appendChild(methodName);
    item.appendChild(description);
    methodList.appendChild(item);
  });

  docPanel.appendChild(methodList);
  return docPanel;
}

createDocumentationPanel();
