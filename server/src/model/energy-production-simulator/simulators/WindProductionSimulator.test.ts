import { WindTurbine } from '../../powerPlants/wind/WindTurbine';
import {
    Windiness,
    WindinessProvider,
} from '../../weather-providers/WindProvider';
import { WindProductionSimulator } from './WindProductionSimulator';

describe('WindProductionSimulator', () => {
    test('should simulate year', async () => {
        const testWindiness: Windiness = new Windiness([]);
        const testWindinesProvider: WindinessProvider = {
            get: () => Promise.resolve(testWindiness),
        };
        const simulator = new WindProductionSimulator(testWindinesProvider);
        const windTurbine = new WindTurbine({ lat: 0, lng: 0 }, {}, 10, 1);

        jest.spyOn(windTurbine, 'power').mockImplementation(() => 7);
        jest.spyOn(testWindiness, 'get').mockImplementation(() => 8);

        const year = await simulator.simulateYear(2001, windTurbine);

        expect(year).toHaveLength(365 * 24);
        expect(
            year.every((record) => record.production.producedElectricity === 7)
        ).toBe(true);
    });
});
