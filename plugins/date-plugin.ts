import { EleventyConfig } from "11ty.ts";
import { DateTime, DateTimeMaybeValid } from "luxon";

const TIME_ZONE = "America/Denver";

class InvalidDateError extends Error {
  constructor(dateValue: string, localDate: DateTime<false>) {
    super(
      `Invalid \`date\` value (${dateValue}) is invalid: ${localDate.invalidReason}`,
    );
  }
}

const dateIsValid = (date: DateTimeMaybeValid): date is DateTime<true> =>
  date.isValid;

const validateDate = (date: DateTimeMaybeValid, repr: string) => {
  if (!dateIsValid(date)) throw new InvalidDateError(repr, date);

  return date;
};

const parseDate = (date: unknown) => {
  if (date instanceof Date)
    return validateDate(
      DateTime.fromJSDate(date, { zone: "utc" }).setZone(TIME_ZONE, {
        keepLocalTime: true,
      }),
      date.toString(),
    );

  if (typeof date === "string")
    return validateDate(DateTime.fromISO(date, { zone: TIME_ZONE }), date);
};

const postDateFilter = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);

export const datePlugin = (cfg: EleventyConfig) => {
  cfg.addDateParsing(parseDate);
  cfg.addFilter("postDate", postDateFilter);
};
