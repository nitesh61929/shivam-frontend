import * as moment from "moment";

export default class DateUtilities {
  static convertDateTImeFormat(dateTime: any, format: string): string {
    const convertedDateTime = moment(dateTime).format(format);
    return convertedDateTime;
  }

  /**
   * Return day along with requested format
   * @param day i.e today/yesterday/tomorrow
   * @param format
   */
  static getday(day: string, format: string): string {
    let momentDay;

    switch (day) {
      case "today": {
        momentDay = moment();
        break;
      }

      case "tomorrow": {
        momentDay = moment().add(1, "days");
        break;
      }

      case "yesterday": {
        momentDay = moment().add(-1, "days");
        break;
      }
    }

    const formattedDay = DateUtilities.convertDateTImeFormat(momentDay, format);
    return formattedDay;
  }

  static substractMonthFromToday() {
    return moment().subtract(1, "months").format("YYYY-MM-DD");
  }

  static toEpoch(date: any) {
    // const toString = moment(date, "YYYY-MM-DD").valueOf().toString();
    // const par = toString.substring(0, toString.length - 5);
    return moment(date, "YYYY-MM-DD").valueOf();
  }

  static epochTODate(date) {
    // const app = date + "00000";
    // const b = +app;

    return moment(date).format("YYYY-MM-DD");
  }
}
