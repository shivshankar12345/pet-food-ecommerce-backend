import moment from "moment";
export const dBDateFormatModule = (date?: Date): string => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
