import lodash from 'lodash';

// Function Description: Whether it is empty_Checks whether the input value is empty.
// input value: chkString_input value information string
// return value: boolean [ true (empty), false (with value) ]
export const isEmpty = (chkString: string) => {
  return lodash.isEmpty(chkString);
};

// Function description: English number _ Checks whether the input value is composed of English numbers.
// input value: chkString_input value String
// return value: boolean[ true (in case of English, number, blank), false ]
export const isEnglishNumber = (chkString: string) => {
  chkString = chkString ?? '';
  if (chkString.length < 0) return false;
  return /^[0-9a-zA-Z\s]*$/.test(chkString);
};

// Function Description: English or not_Checks whether the input value is English or blank.
// input value: chkString_input value String
// Return value: boolean[ true (English, if empty), false ]
export const isEnglish = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[a-zA-Z\s]*$/.test(chkString);
};

// Function Description: Korean or not_Checks whether the input value consists of Korean characters or blanks.
// input value: chkString_input value String
// Return value: boolean[ true (Korean, in case of blank), false ]
export const isHangeul = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[ㄱ-ㅣ가-힣\s]*$/.test(chkString);
};

// Function Description: E-mail or not_Check the e-mail format for the input value.
// input value: chkString_input value String
// return value: boolean [ true (email), false (not email) ]
export const isEmail = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/.test(chkString);
};

// Function Description: Whether mobile number_Checks whether the input value is mobile number.
// input value: mobile phone number String
// Return value: boolean[true(cell phone format), false]
export const isMobileNumber = (chkString: string) => {
  chkString = chkString ?? '';
  if (
    /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/.test(chkString) ||
    /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(chkString)
  ) {
    return true;
  }
  return false;
};

// Function Description: Whether phone number_Checks whether the input value is a phone number.
// input value: phone number String
// return value: boolean[true(phone number format), false]
export const isPhoneNumber = (chkString: string) => {
  chkString = chkString ?? '';
  if (
    /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|505|70))-(\d{3,4})-(\d{4})/.test(
      chkString
    ) ||
    /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|505|70))(\d{3,4})(\d{4})/.test(chkString)
  ) {
    return true;
  }
  return false;
};

// Function description: Uppercase English letters_Checks whether it consists of English letters with uppercase letters only. (with spaces)
// input value: chkString_check string
// return value: boolean [true_capital letters only, false_non-capital letters]
export const isUppercaseEnglish = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[A-Z\s]*$/.test(chkString);
};

// Function description: check whether English capital letters and numbers are checked whether the string is English letters or numbers (including spaces)
// input value: chkString_check string
// Return value: boolean [true_English uppercase number composition, false_English uppercase number characters]
export const isUppercaseEnglishNumber = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[A-Z0-9\s]*$/.test(chkString);
};

// Function Description: Lower case _ Checks whether it consists of English letters only in lower case letters. (with spaces)
// input value: chkString_check string
// return value: boolean [true_consists of only lowercase letters, false_characters other than lowercase letters]
export const isLowercaseEnglish = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[a-z\s]*$/.test(chkString);
};

// Function Description: Number Dash (-) Check_Checks whether a string is a number or a dash. (with spaces)
// input value: chkString_check string
// return value: boolean [true_consists only of number dashes, false_characters other than number dashes]
export const isNumberDash = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[0-9-\s]*$/.test(chkString);
};

// Function description: Number comma (,) check_check whether the string is a number or a comma. (with spaces)
// input value: chkString_check string
// return value: boolean [true_number comma only, false_characters other than number comma]
export const isNumberComma = (chkString: string) => {
  chkString = chkString ?? '';
  return /^[0-9,\s]*$/.test(chkString);
};

// Function description: Whether it is a number_Checks whether the input information is a number.
// Input value: chkNumber_Input number information String
// return value: boolean [ true(number), false(not number) ]
export const isNumber = (chkNumber: string) => {
  chkNumber = chkNumber ?? 0;
  return /^-?\d*\.{0,1}\d+$/.test(chkNumber);
};

// Function Description: Get UTF-8 byte length_Returns byte length information.
// input value: inputString_input character information String
// return value: byate length information
export const getByteLength = (s: string) => {
  let b, i, c;
  for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
};

// Function description: Return the length of the string calculated with 2 Korean and 1 English
// input value: inputString_input character information String
// return value: length information
export const getByteLengthForIn = (s: string) => {
  s = s ?? '';
  let b = 0,
    i,
    c;

  if (s.length > 0) {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : 1);
  }
  return b;
};

// Function description: Get character type_Returns information about character type.
// input value: charValue_information on character value
// Return value: String for character type verification 'H'-Korean, 'E'-English, 'N'-number, 'Z'-other
export const getCharType = (charValue: string) => {
  charValue = charValue ?? '';
  let retStr = '';
  for (let idx = 0; idx < charValue.length; idx++) {
    if (/[a-zA-Z]/g.test(charValue[idx])) {
      retStr = retStr + 'E';
    } else if (/[0-9]/g.test(charValue[idx])) {
      retStr = retStr + 'N';
    } else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(charValue[idx])) {
      retStr = retStr + 'H';
    } else {
      retStr = retStr + 'Z';
    }
  }
  return retStr;
};

// Function Description: Capitalization Change_Changes to uppercase.
// input value: upperString_capital string
// return value: return message information about the error code
export const toUpperCase = (upperString: string) => {
  upperString = upperString ?? '';
  return upperString.toUpperCase();
};

// Function Description: Edit white space after compression_remove white space after compression character
// input value: inputStr_input character
// Return value: the character with the compressed spaces removed.
export const modFrontBackTrim = (inputStr: string) => {
  const tranStr = inputStr ?? '';
  return tranStr.trim();
};

// Function description: Modify comma number_Edit number information with commas.
// input value: chkNumber_Input number information
// return value: numeric information with comma (,) inserted
export const modCommaNumber = (chkNumber: string) => {
  let tranNumber = chkNumber ?? 0;
  const splitTranNumbers = tranNumber.toString().split('.');
  tranNumber = splitTranNumbers[0];
  tranNumber = tranNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!isEmpty(splitTranNumbers[1]))
    tranNumber = `${tranNumber}.${splitTranNumbers[1]}`;
  return tranNumber;
};

// Function Description: Comma Delete Modification_Returns information with commas deleted.
// input value: inputStr_Input character information
// return value: information with commas (,) deleted
export const modCommaRemove = (inputStr: string) => {
  const tranStr = inputStr ?? '';
  return tranStr.replace(/,/gi, '');
};
