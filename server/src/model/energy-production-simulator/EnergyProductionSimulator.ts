import { BiogasPlant } from '../powerPlants/biogas/BiogasPlant';
import { WindProductionSimulator } from './simulators/WindProductionSimulator';
import { BiogasPlantProductionSimulator } from './simulators/BiogasPlantProductionSimulator';
import { ProductionRecord } from './ProductionInYear';
import { PvProductionSimulator } from './simulators/PvProductionSimulator';
import { PowerPlant } from '../powerPlants/PowerPlants';
import { instanceOfPV } from '../powerPlants/solar/Pv';
import { WindTurbine } from '../powerPlants/wind/WindTurbine';

export abstract class EnergyProductionSimulator {
    static async simulateYear(
        year: number,
        powerPlants: Record<string, PowerPlant>,
        onPlantSimulated: (id: string) => void
    ): Promise<Record<string, ProductionRecord[]>> {
        const result: Record<string, ProductionRecord[]> = {};
        for (const id of Object.keys(powerPlants)) {
            const powerPlant = powerPlants[id];
            const simulator = this.getSimulator(powerPlant);
            result[id] = await simulator.simulateYear(year, powerPlant);
            onPlantSimulated(id);
        }
        return result;
    }

    private static getSimulator(powerPlant: PowerPlant) {
        if (instanceOfPV(powerPlant)) {
            return new PvProductionSimulator();
        } else if (powerPlant instanceof WindTurbine) {
            return new WindProductionSimulator();
        } else if (powerPlant instanceof BiogasPlant) {
            return new BiogasPlantProductionSimulator();
        } else {
            console.warn(`Unrecognised power plant: "${powerPlant}"`);
        }
    }
}
