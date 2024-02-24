import { log } from 'console'
import { PaymentTypes } from './types'
import { useEffect, useState } from 'react'

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */

// ** Checks if the passed date is today
const isToday = (date: Date | string) => {
  const today = new Date()

  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  )
}

export const customDateFormat = (value: Date | string) => {
  if (!value) return value
  const customDate = `${("0" + new Date(value).getDate()).slice(-2)}/${("0" + (new Date(value).getMonth() + 1)).slice(-2)}/${new Date(value).getFullYear()}`

  return customDate
}
export const customDateFormatToString = (value: Date | string) => {
  if (!value) return value;

  // Convert to Date object if it's not already
  const dateObject = value instanceof Date ? value : new Date(value);

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long',
  };

  // Format the date using toLocaleString
  const customDate = dateObject.toLocaleString('en-US', options);

  return customDate;
};
export const customDateFormatDash = (value: Date | string) => {
  if (!value) return value
  const customDate = `${("0" + new Date(value).getDate()).slice(-2)}-${("0" + (new Date(value).getMonth() + 1)).slice(-2)}-${new Date(value).getFullYear()}`

  return customDate
}

export const convertTimeToFormattedDate = (inputDate: any) => {
  if (!inputDate) return inputDate
  const dateAndTime = inputDate?.split(' ')[1];
  const dateParts = dateAndTime?.split(', ');
  const time = dateParts[1];
  const day = dateParts[0]?.split(' ')[1];
  const year = dateParts[2];
  const meridian = time?.split(' ')[2];
  const timeParts = time?.split(':');
  const timeZone = inputDate?.split(' ')[6];

  const monthAbbreviation = dateParts[0]?.split(' ')[0];
  const months: any = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const month: any = months[monthAbbreviation];
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  if (meridian === 'PM') {
    hours += 12;
  }
  const formattedDate = new Date(
    Date.UTC(year, month, day, hours, minutes)
  );
  const options: any = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const formattedDateString = formattedDate.toLocaleString('en-US', options);
  const formattedDateWithTimeZone = `${formattedDateString} ${timeZone}`;

  return formattedDateWithTimeZone;
}

// export const TimeConversion = (inputDate: any) => {
//   const [formattedTime, setFormattedTime] = useState('');
//   useEffect(() => {
//     const inputTime = "Mon Sep 11 2023 10:30:00 GMT+0530 (India Standard Time)";
//     const parsedTime = new Date(inputTime);
//     const options: any = { hour: '2-digit', minute: '2-digit', hour12: true };
//     const formattedTimeString = parsedTime.toLocaleTimeString('en-US', options);
//     setFormattedTime(formattedTimeString);
//     console.log(formattedTime)
//   }, []);

//   return formattedTime
// }

export const convertToISODate = (dateString: any) => {
  if (!dateString) return

  const [month, day, year] = dateString.split("/");

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00.000Z`
}

export const customTimeFormat = (value: Date) => {
  if (!value) return value

  const customTime = value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return customTime
}

export const formatDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: Date | string, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}


const clearNumber = (value = '') => {
  return value.replace(/\D+/g, '')
}

export const formatCreditCardNumber = (value: string, Payment: PaymentTypes) => {
  if (!value) {
    return value
  }

  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value)
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`
      break
  }

  return nextValue.trim()
}

// Format expiration date in any credit card
export const formatExpirationDate = (value: string) => {
  const finalValue = value
    .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
    .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 > 01/3
    .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2') // 141 > 01/41
    .replace(/^([0]+)\/|[0]+$/g, '0') // 0/ > 0 and 00 > 0
    // To allow only digits and `/`
    .replace(/[^\d\/]|^[\/]*$/g, '')
    .replace(/\/\//g, '/') // Prevent entering more than 1 `/`

  return finalValue
}

// Format CVC in any credit card
export const formatCVC = (value: string, cardNumber: string, Payment: PaymentTypes) => {
  const clearValue = clearNumber(value)
  const issuer = Payment.fns.cardType(cardNumber)
  const maxLength = issuer === 'amex' ? 4 : 3

  return clearValue.slice(0, maxLength)
}

export const customLastDayPaymentDateFormet = (value: Date | string) => {
  if (!value) return value
  const customLastDayPaymentDateFormet = `${new Date(value).getFullYear()}/${new Date(value).getDate()}/${new Date(value).getMonth() + 1
    }`

  return customLastDayPaymentDateFormet
}
