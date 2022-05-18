import { Hour } from '../energy-production-simulator/ProductionInYear';
import { PVGisRawResponse } from '../mocks/PvGisResponse';
import nock from 'nock';
import { PvGisWindinessProvider } from './PvGisWindinessProvider';

describe('PvGisWindinessProvider', () => {
    test('should get data from EU PV GIS and return windiness data', async () => {
        const pvGisRequest = nock('https://re.jrc.ec.europa.eu')
            .get(
                '/api/v5_2/seriescalc?lat=0&lon=1&outputformat=json&startyear=2020&endyear=2020'
            )
            .reply(200, PVGisRawResponse);

        const provider = new PvGisWindinessProvider();
        const irradiation = await provider.get(2020, { lat: 0, lng: 1 });

        expect(pvGisRequest.isDone()).toBe(true);
        expect(irradiation.get(new Hour(2020, 1, 1, 0))).toBe(3.61);
        expect(irradiation.get(new Hour(2020, 1, 1, 1))).toBe(0.76);
    });
});
