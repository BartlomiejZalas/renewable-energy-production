import { BiogasPlant } from '../../powerPlants/biogas/BiogasPlant';
import { PV } from '../../powerPlants/solar/Pv';
import { WindTurbine } from '../../powerPlants/wind/WindTurbine';
import { HoursGenerator } from '../HoursGenerator';
import { ProductionRecord } from '../ProductionInYear';

export class BiogasPlantProductionSimulator {
    async simulateYear(
        year: number,
        biogasPlant: PV | BiogasPlant | WindTurbine
    ): Promise<ProductionRecord[]> {
        if (!(biogasPlant instanceof BiogasPlant)) {
            throw new Error('Biogas simulator requires biogas plant!');
        }

        const hours = HoursGenerator.generateYear(year);
        const production = biogasPlant.energyPerHour();
        const productionRecord = hours.map((date) => ({ date, production }));
        return Promise.resolve(productionRecord);
    }
}
