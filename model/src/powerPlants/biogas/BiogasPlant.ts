import { Production } from '../../Production';

export class BiogasPlant {
    constructor(
        private readonly methanePerHour: number,
        private readonly methaneCaloricValue: number,
        private readonly heatGeneratorEfficiency: number,
        private readonly electricityGeneratorEfficiency: number,
        private readonly ownHeatConsumption: number,
        private readonly ownElectricityConsumption: number
    ) {}

    energyPerHour(): Production {
        const producedElectricity =
            this.getNetElectricityFactor() *
            this.getTotalElectricistyProduction();
        const proucedHeat =
            this.getNetHeatFactor() * this.getTotalHeatProduction();

        return { producedElectricity, proucedHeat };
    }

    private getTotalElectricistyProduction() {
        return (
            this.methanePerHour *
            this.methaneCaloricValue *
            this.electricityGeneratorEfficiency
        );
    }
    private getTotalHeatProduction() {
        return (
            this.methanePerHour *
            this.methaneCaloricValue *
            this.heatGeneratorEfficiency
        );
    }

    private getNetElectricityFactor() {
        return 1 - this.ownElectricityConsumption;
    }

    private getNetHeatFactor() {
        return 1 - this.ownHeatConsumption;
    }

    static isBiogasPlant(plant: any): plant is BiogasPlant {
        return plant instanceof BiogasPlant;
    }
}
