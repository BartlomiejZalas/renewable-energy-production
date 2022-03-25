import { BiogasPlant } from '../../powerPlants/biogas/BiogasPlant';
import { BiogasPlantProductionSimulator } from './BiogasPlantProductionSimulator';

describe('BiogasPlantProductionSimulator', () => {
    test('should simulate year', async () => {
        const simulator = new BiogasPlantProductionSimulator();
        const biogasPlant = new BiogasPlant(1, 2, 3, 4, 5, 6);

        jest.spyOn(biogasPlant, 'energyPerHour').mockImplementation(() => ({
            producedElectricity: 7,
            proucedHeat: 8,
        }));

        const year = await simulator.simulateYear(2001, biogasPlant);

        expect(year).toHaveLength(365 * 24);
        expect(
            year.every((record) => record.production.producedElectricity === 7)
        ).toBe(true);
        expect(
            year.every((record) => record.production.proucedHeat === 8)
        ).toBe(true);
    });
});
