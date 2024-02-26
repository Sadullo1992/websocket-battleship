const parseNested = (str: string): unknown => {
  try {
    return JSON.parse(str, (_, val) => {
      if (typeof val === 'string') return parseNested(val);
      return val;
    });
  } catch (exc) {
    return str;
  }
};

export { parseNested };
