import { PVAreaAndEfficiency } from './PVAreaAndEfficiency';
import { PvNominalPower } from './PvNominalPower';

const location = { lat: 0, lng: 0 };

describe('PV', () => {
    describe('nominal power', () => {
        it('should calculate power', () => {
            const pv = new PvNominalPower(location, 300, 0, 0);

            expect(pv.power(0)).toBe(0);
            expect(pv.power(500)).toBe(150);
            expect(pv.power(1000)).toBe(300);
            expect(pv.power(2000)).toBe(600);
            expect(pv.power(3000)).toBe(900);
        });
    });

    describe('area and efficiency', () => {
        it('should calculate power for 1m2, 10% efficient installation', () => {
            const pv = new PVAreaAndEfficiency(location, 1, 0.1, 0, 0);

            expect(pv.power(0)).toBe(0);
            expect(pv.power(100)).toBe(10);
            expect(pv.power(1000)).toBe(100);
            expect(pv.power(2000)).toBe(200);
            expect(pv.power(3000)).toBe(300);
        });

        it('should calculate power for 2m2, 10% efficient installation', () => {
            const pv = new PVAreaAndEfficiency(location, 2, 0.1, 0, 0);

            expect(pv.power(0)).toBe(0);
            expect(pv.power(100)).toBe(20);
            expect(pv.power(1000)).toBe(200);
            expect(pv.power(2000)).toBe(400);
            expect(pv.power(3000)).toBe(600);
        });

        it('should calculate power for 1m2, 0% efficient installation', () => {
            const pv = new PVAreaAndEfficiency(location, 1, 0, 0, 0);

            expect(pv.power(0)).toBe(0);
            expect(pv.power(100)).toBe(0);
            expect(pv.power(1000)).toBe(0);
            expect(pv.power(2000)).toBe(0);
            expect(pv.power(3000)).toBe(0);
        });

        it('should calculate power for 1m2, 100% efficient installation', () => {
            const pv = new PVAreaAndEfficiency(location, 1, 1, 0, 0);

            expect(pv.power(0)).toBe(0);
            expect(pv.power(100)).toBe(100);
            expect(pv.power(1000)).toBe(1000);
            expect(pv.power(2000)).toBe(2000);
            expect(pv.power(3000)).toBe(3000);
        });
    });
});
