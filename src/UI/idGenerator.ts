let num = 0;

export const generateId = (word: string) => {
  return word + num++;
};
