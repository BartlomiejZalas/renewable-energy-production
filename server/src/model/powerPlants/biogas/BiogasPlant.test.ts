import { BiogasPlant } from './BiogasPlant';

describe('BiogasPlant', () => {
    it('should produce energy in cogeneration', () => {
        const energy = new BiogasPlant(
            10,
            6.11,
            0.43,
            0.38,
            0.3,
            0.09
        ).energyPerHour();

        expect(energy.producedElectricity).toBeCloseTo(21.13, 2);
        expect(energy.proucedHeat).toBeCloseTo(18.39, 2);
    });

    it('should produce electricity', () => {
        const energy = new BiogasPlant(
            10,
            6.11,
            0.43,
            0,
            0.3,
            0
        ).energyPerHour();

        expect(energy.producedElectricity).toBe(0);
        expect(energy.proucedHeat).toBeCloseTo(18.39, 2);
    });

    it('should produce heat', () => {
        const energy = new BiogasPlant(
            10,
            6.11,
            0,
            0.38,
            0,
            0.09
        ).energyPerHour();

        expect(energy.producedElectricity).toBeCloseTo(21.13, 2);
        expect(energy.proucedHeat).toBe(0);
    });
});
