export function log(message, type = '', errorContainer) {
  errorContainer.innerHTML += `<span class="${type}">${message}</span>\n`;
}

export function validateTestMethod(methodName, VALID_METHODS, errorContainer) {
  if (!VALID_METHODS.includes(methodName)) {
    log(
      `Invalid test method: '${methodName}'. Available methods are: ${VALID_METHODS.join(
        ', '
      )}`,
      'fail',
      errorContainer
    );
    throw new Error(
      `Invalid test method: '${methodName}'. Available methods are: ${VALID_METHODS.join(
        ', '
      )}`
    );
  }
}

export function validateTestCode(testCode, VALID_METHODS, errorContainer) {
  const methodCallRegex = /expect\([^)]*\)\.(\w+)/g;
  let match;

  while ((match = methodCallRegex.exec(testCode)) !== null) {
    const methodName = match[1];
    validateTestMethod(methodName, VALID_METHODS, errorContainer);
  }
}
