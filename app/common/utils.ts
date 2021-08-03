export const d = (...args: Parameters<typeof Date.UTC>) =>
  new Date(Date.UTC.apply(null, args));
