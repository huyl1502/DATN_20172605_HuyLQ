export default class Utility {
    static getTimeString(input: any) {
        let date = new Date(input);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    static getUTCDateTime(input: any) {
        let date = new Date(input);
        date.setDate(date.getDate() - 1);
        return date;
    }
}