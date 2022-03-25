import { PvNominalPower } from '../../powerPlants/solar/PvNominalPower';
import {
    Irradiation,
    IrradiationProvider,
} from '../../weather-providers/IrradiationProvider';
import { PvProductionSimulator } from './PvProductionSimulator';

describe('PvProductionSimulator', () => {
    test('should simulate year', async () => {
        const testIrradiation: Irradiation = new Irradiation([]);
        const testIrradiationProvider: IrradiationProvider = {
            get: () => Promise.resolve(testIrradiation),
        };
        const simulator = new PvProductionSimulator(testIrradiationProvider);
        const pv = new PvNominalPower({ lat: 0, lng: 0 }, 310, 10, 30);

        jest.spyOn(pv, 'power').mockImplementation(() => 7);
        jest.spyOn(testIrradiation, 'get').mockImplementation(() => 8);

        const year = await simulator.simulateYear(2001, pv);

        expect(year).toHaveLength(365 * 24);
        expect(
            year.every((record) => record.production.producedElectricity === 7)
        ).toBe(true);
    });
});
