const pad = (number: number) => {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};

export const getDateObject = (date: Date) => {
  return {
    yyyy: date.getFullYear(),
    dd: pad(date.getDate()),
    mm: pad(date.getMonth() + 1),
  };
};

export const getMonday = (d: Date) => {
  const date = new Date(d.getTime());
  date.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1));
  return date;
};

export const getPreviousMonday = (d: Date) => {
  const monday = getMonday(new Date(d.getTime()));
  monday.setDate(monday.getDate() - 7);
  return monday;
};

export const getNextMonday = (d: Date) => {
  const monday = getMonday(new Date(d.getTime()));
  monday.setDate(monday.getDate() + 7);
  return monday;
};

export const getDateFormat = (date: Date, format: string) => {
  const data = getDateObject(date);
  const stringReplace = format.split(/\s|\-|\//gi);
  const stringValue = stringReplace.map(index => (data as any)[index]);
  return stringReplace.reduce(
    (acc, str, index) => ((acc = acc.replace(str, stringValue[index])), acc),
    format
  );
};

export const getWeekDates = (date: Date) =>
  Array.from(Array(7).keys()).map(
    n => new Date(new Date(date).setDate(date.getDate() + n))
  );
