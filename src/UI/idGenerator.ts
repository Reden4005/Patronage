export const generateId = (word: string) => {
  return word + Math.random().toString(36).substr(2, 9);
};
