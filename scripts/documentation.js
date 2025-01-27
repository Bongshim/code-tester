export const METHOD_DOCS = {
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

export const VALID_METHODS = [
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

export function createDocumentationPanel(
  docPanelContent,
  VALID_METHODS,
  METHOD_DOCS
) {
  const header = document.createElement('h3');
  header.textContent = 'Available Test Methods';
  docPanelContent.appendChild(header);

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

  docPanelContent.appendChild(methodList);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search test methods...';
  searchInput.classList.add('search-input');
  docPanelContent.prepend(searchInput);

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const items = methodList.querySelectorAll('li');

    items.forEach((item) => {
      const methodName = item.querySelector('strong').textContent.toLowerCase();
      item.style.display = methodName.includes(query) ? 'block' : 'none';
    });
  });

  return docPanelContent;
}
