export const formatExpDate = (expDate: string) => {
  const [month, year] = expDate.replace(/ /g, "").split("/");
  const yearTwoDigits = year.substr(year.length - 2);
  return `${month}/${yearTwoDigits}`;
};
