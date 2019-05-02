export const isObject = (value: {}): boolean => (value && typeof value === 'object' && !Array.isArray(value));
