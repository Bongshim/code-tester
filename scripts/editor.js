require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs',
  },
});

import { VALID_METHODS } from './documentation.js';
import { Expect } from './expect.js';
import { log, validateTestCode } from './utils.js';

export function initializeEditors(
  codeEditorElement,
  testEditorElement,
  testOutput
) {
  require(['vs/editor/editor.main'], function () {
    const codeEditor = monaco.editor.create(codeEditorElement, {
      value:
        '// Write your code here...\nlet name = "John";\nlet age = 25;\nlet isDaytime = true;',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
    });

    const testEditor = monaco.editor.create(testEditorElement, {
      value:
        '// Use userCode to reference the code input\nexpect(userCode).toMatch(/let\\s+name\\s*=\\s*".*";/);\nexpect(userCode).toMatch(/let\\s+age\\s*=\\s*\\d+;/);\nexpect(userCode).toMatch(/let\\s+isDaytime\\s*=\\s*(true|false);/);',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
    });

    function expect(actual) {
      return new Expect(actual);
    }

    function runTests() {
      testOutput.innerHTML = '';
      const userCode = codeEditor.getValue();
      const testCode = testEditor.getValue();

      validateTestCode(testCode, VALID_METHODS, testOutput);

      try {
        const runTest = new Function('userCode', 'expect', testCode);
        runTest(userCode, expect);

        log('✓ All tests passed!', 'pass', testOutput);
      } catch (error) {
        log(`✗ ${error.message}`, 'fail', testOutput);
      }
    }

    document.getElementById('runBtn').addEventListener('click', runTests);
    document
      .getElementById('clearBtn')
      .addEventListener('click', () => (testOutput.innerHTML = ''));
    codeEditor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      runTests
    );
    testEditor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      runTests
    );

    window.addEventListener('resize', () => {
      codeEditor.layout();
      testEditor.layout();
    });
  });
}
