import { Hour } from './ProductionInYear';

export abstract class HoursGenerator {
    static generateYear(year: number) {
        const months = Array.from(new Array(12).keys());
        const hours: Hour[] = [];

        months.forEach((month) => {
            const date = new Date(year, month, 1);
            while (date.getMonth() === month) {
                Array.from(new Array(24).keys()).forEach((hour) =>
                    hours.push(new Hour(year, month + 1, date.getDate(), hour))
                );
                date.setDate(date.getDate() + 1);
            }
        });

        return hours;
    }
}
