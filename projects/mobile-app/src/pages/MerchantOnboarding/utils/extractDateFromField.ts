import moment from "moment/moment";
import { Countries } from "utils/Countries";

export const extractDateFromField = (fieldValue: string, selectedCountry: Countries) => {
  let dateFormat = "DD/MM/YYYY";
  if (selectedCountry === Countries.US) {
    dateFormat = "MM/DD/YYYY";
  }

  const value = moment(fieldValue, dateFormat);
  return { year: value.year(), month: value.month()+1, day: value.date() };
};
