import { HoursGenerator } from './HoursGenerator';

describe('HoursGenerator', () => {
    it('should generate normal year', () => {
        const hours = HoursGenerator.generateYear(2015);

        const firstDayOfYear = 0;
        const february28th0AM = 31 * 24 + 27 * 24;
        const february28th23AM = february28th0AM + 23;
        const march1st0AM = february28th23AM + 1;
        const lastDayOfYear = 365 * 24 - 1;

        expect(hours).toHaveLength(365 * 24);
        expect(hours[firstDayOfYear]).toEqual({
            year: 2015,
            month: 1,
            day: 1,
            hour: 0,
        });
        expect(hours[february28th0AM]).toEqual({
            year: 2015,
            month: 2,
            day: 28,
            hour: 0,
        });
        expect(hours[february28th23AM]).toEqual({
            year: 2015,
            month: 2,
            day: 28,
            hour: 23,
        });
        expect(hours[march1st0AM]).toEqual({
            year: 2015,
            month: 3,
            day: 1,
            hour: 0,
        });
        expect(hours[lastDayOfYear]).toEqual({
            year: 2015,
            month: 12,
            day: 31,
            hour: 23,
        });
    });

    it('should generate leap year', () => {
        const hours = HoursGenerator.generateYear(2016);

        const firstDayOfYear = 0;
        const february28th0AM = 31 * 24 + 27 * 24;
        const february28th23AM = february28th0AM + 23;
        const february29th0AM = february28th23AM + 1;
        const february29th23AM = february29th0AM + 23;
        const march1st0AM = february29th23AM + 1;
        const lastDayOfYear = 366 * 24 - 1;

        expect(hours).toHaveLength(366 * 24);
        expect(hours[firstDayOfYear]).toEqual({
            year: 2016,
            month: 1,
            day: 1,
            hour: 0,
        });
        expect(hours[february28th0AM]).toEqual({
            year: 2016,
            month: 2,
            day: 28,
            hour: 0,
        });
        expect(hours[february28th23AM]).toEqual({
            year: 2016,
            month: 2,
            day: 28,
            hour: 23,
        });
        expect(hours[february29th0AM]).toEqual({
            year: 2016,
            month: 2,
            day: 29,
            hour: 0,
        });
        expect(hours[february29th23AM]).toEqual({
            year: 2016,
            month: 2,
            day: 29,
            hour: 23,
        });
        expect(hours[march1st0AM]).toEqual({
            year: 2016,
            month: 3,
            day: 1,
            hour: 0,
        });
        expect(hours[lastDayOfYear]).toEqual({
            year: 2016,
            month: 12,
            day: 31,
            hour: 23,
        });
    });
});
