export const d = (...args: Parameters<typeof Date.UTC>) =>
  new Date(Date.UTC.apply(null, args));

// arbitrarily use 2021, january 1, as the date
// to represent just a 24 hour time (ignore the day part)
export const time = (hours: number, minutes: number) =>
  new Date(2021, 0, 1, hours, minutes, 0);
