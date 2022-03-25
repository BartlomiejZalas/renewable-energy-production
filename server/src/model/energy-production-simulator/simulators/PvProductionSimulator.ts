import { PowerPlant } from '../../powerPlants/PowerPlants';
import { instanceOfPV } from '../../powerPlants/solar/Pv';
import { IrradiationProvider } from '../../weather-providers/IrradiationProvider';
import { PvGisIrradiationProvider } from '../../weather-providers/PvGisIrradiationProvider';
import { HoursGenerator } from '../HoursGenerator';
import { ProductionRecord } from '../ProductionInYear';

export class PvProductionSimulator {
    private readonly irradiationProvider: IrradiationProvider;

    constructor(
        irradiationProvider: IrradiationProvider = new PvGisIrradiationProvider()
    ) {
        this.irradiationProvider = irradiationProvider;
    }

    async simulateYear(
        year: number,
        pv: PowerPlant
    ): Promise<ProductionRecord[]> {
        if (!instanceOfPV(pv)) {
            throw new Error('Wind production simulator requires WindTurbine!');
        }

        const hours = HoursGenerator.generateYear(year);
        const irradiation = await this.irradiationProvider.get(
            year,
            pv.getLocation(),
            pv.getAzimuth(),
            pv.getAngle()
        );

        return hours.map((date) => ({
            date,
            production: {
                producedElectricity: pv.power(irradiation.get(date)),
                proucedHeat: 0,
            },
        }));
    }
}
