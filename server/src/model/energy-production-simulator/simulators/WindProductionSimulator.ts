import { HoursGenerator } from '../HoursGenerator';
import { ProductionRecord } from '../ProductionInYear';
import { PvGisWindinessProvider } from '../../weather-providers/PvGisWindinessProvider';
import { WindinessProvider } from '../../weather-providers/WindProvider';
import { PowerPlant } from '../../powerPlants/PowerPlants';
import { WindTurbine } from '../../powerPlants/wind/WindTurbine';

export class WindProductionSimulator {
    private readonly windinessProvider: WindinessProvider;

    constructor(
        windinessProvider: WindinessProvider = new PvGisWindinessProvider()
    ) {
        this.windinessProvider = windinessProvider;
    }

    async simulateYear(
        year: number,
        windTurbine: PowerPlant
    ): Promise<ProductionRecord[]> {
        if (!(windTurbine instanceof WindTurbine)) {
            throw new Error('Wind production simulator requires WindTurbine!');
        }

        const hours = HoursGenerator.generateYear(year);
        const windiness = await this.windinessProvider.get(
            year,
            windTurbine.getLocation()
        );

        return hours.map((date) => ({
            date,
            production: {
                producedElectricity: windTurbine.power(windiness.get(date)),
                producedHeat: 0,
            },
        }));
    }
}
