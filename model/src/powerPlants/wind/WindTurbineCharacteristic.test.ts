import { WindTurbineCharacteristic } from './WindTurbineCharacteristic';

describe('WindTurbineCharacteristic', () => {
    test('should get value between two values', () => {
        const characteristic = new WindTurbineCharacteristic({ 1: 2, 2: 4 });
        expect(characteristic.getEvaluatedPower(1.5)).toBe(3);
    });

    test('should get exact value', () => {
        const characteristic = new WindTurbineCharacteristic({ 1: 2, 2: 4 });
        expect(characteristic.getEvaluatedPower(1)).toBe(2);
        expect(characteristic.getEvaluatedPower(2)).toBe(4);
    });

    test('should solve real live  example', () => {
        const AWT26characteristic = {
            1.5: 0,
            2.5: 0,
            3.5: 0,
            4.5: 0,
            5.5: 11,
            6.5: 30,
            7.5: 57,
            10.5: 164,
            11.5: 198,
            12.5: 228,
            13.5: 247,
            14.5: 260,
            15.5: 267,
            16.5: 272,
            17.5: 275,
            18.5: 275,
            19.5: 271,
            20.5: 266,
            21.5: 262,
            22.5: 0,
            23.5: 0,
            24.5: 0,
            25.5: 0,
        };

        const characteristic = new WindTurbineCharacteristic(
            AWT26characteristic
        );

        expect(characteristic.getEvaluatedPower(0)).toBe(0);
        expect(characteristic.getEvaluatedPower(1)).toBe(0);
        expect(characteristic.getEvaluatedPower(1.5)).toBe(0);
        expect(characteristic.getEvaluatedPower(5.5)).toBe(11);
        expect(characteristic.getEvaluatedPower(6.5)).toBe(30);
        expect(characteristic.getEvaluatedPower(6.75)).toBe(36.75);
        expect(characteristic.getEvaluatedPower(7)).toBe(43.5);
        expect(characteristic.getEvaluatedPower(7.0)).toBe(43.5);
        expect(characteristic.getEvaluatedPower(7.25)).toBe(50.25);
        expect(characteristic.getEvaluatedPower(7.5)).toBe(57);
        expect(characteristic.getEvaluatedPower(21.5)).toBe(262);
        expect(characteristic.getEvaluatedPower(22.5)).toBe(0);
        expect(characteristic.getEvaluatedPower(23)).toBe(0);
        expect(characteristic.getEvaluatedPower(25.5)).toBe(0);
        expect(characteristic.getEvaluatedPower(26)).toBe(0);
        expect(characteristic.getEvaluatedPower(1000)).toBe(0);
    });

    test('should return 0 if wind speed is below characteristic range', () => {
        const characteristic = new WindTurbineCharacteristic({ 1: 2, 2: 3 });
        expect(characteristic.getEvaluatedPower(0)).toBe(0);
        expect(characteristic.getEvaluatedPower(0.9)).toBe(0);
    });

    test('should return 0 if wind speed is abowe characteristic range', () => {
        const characteristic = new WindTurbineCharacteristic({ 1: 2, 2: 3 });
        expect(characteristic.getEvaluatedPower(2.1)).toBe(0);
        expect(characteristic.getEvaluatedPower(3)).toBe(0);
    });
});
