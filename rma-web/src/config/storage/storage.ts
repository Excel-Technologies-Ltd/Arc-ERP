export const storage = {
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '');
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
