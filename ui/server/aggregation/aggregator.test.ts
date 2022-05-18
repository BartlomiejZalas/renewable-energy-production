import { aggregate } from './aggregator';
import { Hour, ProductionRecord } from '../model/energy-production-simulator/ProductionInYear';

describe('Aggregator', () => {
    it('should aggregate values', () => {
        const simulation: Record<string, ProductionRecord[]> = {
            pv1: [
                {
                    date: new Hour(2020, 1, 1, 0),
                    production: {producedHeat: 0, producedElectricity: 10}
                },
                {
                    date: new Hour(2020, 1, 1, 1),
                    production: {producedHeat: 0, producedElectricity: 11}
                },
                {
                    date: new Hour(2020, 2, 1, 0),
                    production: {producedHeat: 0, producedElectricity: 12}
                }
            ],
            biogas1: [
                {
                    date: new Hour(2020, 1, 1, 0),
                    production: {producedHeat: 20, producedElectricity: 30}
                },
                {
                    date: new Hour(2020, 1, 1, 1),
                    production: {producedHeat: 20, producedElectricity: 30}
                },
                {
                    date: new Hour(2020, 2, 1, 0),
                    production: {producedHeat: 20, producedElectricity: 30}
                }
            ]
        }


        const result = aggregate(simulation);

        expect(result.hourly).toEqual([
            {
                date: {year: 2020, month: 1, day: 1, hour: 0},
                pv1: {producedHeat: 0, producedElectricity: 10},
                biogas1: {producedHeat: 20, producedElectricity: 30}
            },
            {
                date: {year: 2020, month: 1, day: 1, hour: 1},
                pv1: {producedHeat: 0, producedElectricity: 11},
                biogas1: {producedHeat: 20, producedElectricity: 30}
            },
            {
                date: {year: 2020, month: 2, day: 1, hour: 0},
                pv1: {producedHeat: 0, producedElectricity: 12},
                biogas1: {producedHeat: 20, producedElectricity: 30}
            }
        ]);

        expect(result.monthly).toEqual([
            {
                date: {year: 2020, month: 1, day: 1},
                pv1: {producedHeat: 0, producedElectricity: 21},
                biogas1: {producedHeat: 40, producedElectricity: 60}
            },
            {
                date: {year: 2020, month: 2, day: 1},
                pv1: {producedHeat: 0, producedElectricity: 12},
                biogas1: {producedHeat: 20, producedElectricity: 30}
            },
        ]);

        expect(result.total).toEqual({
            pv1: {producedHeat: 0, producedElectricity: 33},
            biogas1: {producedHeat: 60, producedElectricity: 90}
        });
    });
})