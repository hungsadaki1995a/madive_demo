import moment from 'moment';

moment.locale('ko', {
  weekdays: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});

// Function description: Leap year or not_Checks whether the input year is a leap year.
// Input value: inputYear_Input year information String
// Return value: boolean [ true (leap year), false (non-leap year) ]
export const isLeaf = (inputYear: string) => {
  inputYear = inputYear ?? moment().year();
  let booleanResult = false;
  if (Number(inputYear) % 4 === 0) {
    booleanResult = true;
    if (Number(inputYear) % 100 === 0) booleanResult = false;
    if (Number(inputYear) % 400 === 0) booleanResult = true;
  }
  return booleanResult;
};

// Function Description: Date or not_Checks whether the input date information is correct.
// input values: inputDate_input date, dateFormat_date format
// return value: boolean[ true(date), false(not date) ]
export const isDate = (inputDate: string, dateFormat: string) => {
  dateFormat = dateFormat ?? 'YYYYMMDD';
  inputDate = inputDate ?? '';
  return moment(inputDate, dateFormat).isValid();
};

// Function description: future availability_check whether the entered date is in the future
// input value: dateString_Date string, dateFormat_date format format
// return value: boolean [true_future, false_past]
export const isFuture = (dateString: string, dateFormat: string) => {
  dateFormat = dateFormat ?? 'YYYYMMDDHHmmss';
  dateString = dateString ?? moment().format(dateFormat);
  if (moment(dateString, dateFormat) < moment()) return false;
  return true;
};

// Function description: Whether in the past_Check whether the entered date is in the past
// input value: dateString_Date string, dateFormat_date format format
// return value: boolean [true_future, false_past]
export const isPastTime = (dateString: string, dateFormat: string) => {
  dateFormat = dateFormat ?? 'YYYYMMDDHHmmss';
  dateString = dateString ?? moment().format(dateFormat);
  if (moment(dateString, dateFormat) > moment()) return false;
  return true;
};

// Function description: get date difference date_calculate difference date based on start date and end date
// Input values: start date String, end date String, date format String
// return value: difference date String
export const getDiffDateDay = (
  startDate: string,
  endDate: string,
  dateFormat: string
) => {
  dateFormat = dateFormat ?? 'YYYYMMDD';
  if (!moment(startDate, dateFormat).isValid()) return 0;
  if (!moment(endDate, dateFormat).isValid()) return 0;
  return moment(endDate, dateFormat).diff(
    moment(startDate, dateFormat),
    'days'
  );
};

// Function Description: Get today's date_Return information about today's date.
// Input value: formatWord_date format information String
// Return Value: Information about today's date String
export const getToday = (formatWord: string) => {
  formatWord = formatWord ?? 'YYYYMMDD';
  return moment().format(formatWord);
};

// Function description: Get format date_Gets the date as information about the input date and format information.
// Input value: inputDate_date information String formatWord_date format information String
// return value: get date for format String
export const getFormatDate = (inputDate: string, formatWord: string) => {
  formatWord = formatWord ?? 'YYYY.MM.DD';
  inputDate = inputDate ?? moment().format(formatWord);
  return moment(inputDate.toString()).format(formatWord);
};

// Function Description: Get the current time_Return information about the current time.
// Input value: formatWord_Time Information String
// Return value: String of information about the current year month date hour minute second
export const getNow = (formatWord: string) => {
  formatWord = formatWord ?? 'YYYYMMDDHHmmss';
  return moment().format(formatWord);
};

// Function description: Get the day of the week for the date_Get the day of the week for the date.
// Input value: dateStr_date string information, formatWord_day classification [dddd,ddd] dddd: day word, ddd day abbreviation
// return value: day of the week for that date
export const getDayOfWeek = (
  dateStr: string,
  formatWord: string,
  localeStr: string
) => {
  dateStr = dateStr ?? moment().format('YYYYMMDD');
  formatWord = formatWord ?? 'dddd';
  localeStr = localeStr ?? 'ko';
  if (formatWord !== 'dddd') {
    formatWord = 'dddd';
  }
  return moment(dateStr).locale(localeStr).format(formatWord);
};

// Function description: Get today's date_Get the day of the week for today's date.
// Input value: formatWord_day division[dddd,ddd] dddd: day word, ddd day abbreviation
// return value: day of the week for today's date
export const getTodayOfWeek = (formatWord: string, localeStr: string) => {
  formatWord = formatWord ?? 'dddd';
  localeStr = localeStr ?? 'ko';
  if (formatWord !== 'dddd') {
    formatWord = 'dddd';
  }
  return moment().locale(localeStr).format(formatWord);
};
