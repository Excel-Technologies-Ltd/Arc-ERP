export const flattenObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
    const value = obj[key];

    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      Object.assign(acc, flattenObject(value));
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};
