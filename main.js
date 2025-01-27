// main.js
import {
  METHOD_DOCS,
  VALID_METHODS,
  createDocumentationPanel,
} from './scripts/documentation.js';
import { initializeEditors } from './scripts/editor.js';

const testOutput = document.getElementById('test-output');
const docPanel = document.getElementById('documentation-overlay');
const docPanelContent = document.getElementById('documentation-panel');
const toggleDocsBtn = document.getElementById('toggleDocs');

toggleDocsBtn.addEventListener('click', () => {
  docPanel.style.display = docPanel.style.display === 'none' ? 'block' : 'none';
});

docPanel.style.display = 'none';

docPanel.addEventListener('click', (event) => {
  if (event.target === docPanel) {
    docPanel.style.display =
      docPanel.style.display === 'none' || !docPanel.style.display
        ? 'block'
        : 'none';
  }
});

createDocumentationPanel(docPanelContent, VALID_METHODS, METHOD_DOCS);

initializeEditors(
  document.getElementById('code-editor'),
  document.getElementById('test-editor'),
  testOutput
);
