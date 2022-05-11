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
        const producedHeat =
            this.getNetHeatFactor() * this.getTotalHeatProduction();

        return { producedElectricity, producedHeat };
    }

    private getTotalElectricistyProduction() {
        return (
            this.getMethaneValue() * (this.electricityGeneratorEfficiency / 100)
        );
    }
    private getTotalHeatProduction() {
        return this.getMethaneValue() * (this.heatGeneratorEfficiency / 100);
    }

    private getMethaneValue() {
        return ((this.methanePerHour * this.methaneCaloricValue) / 3600) * 1000;
    }

    private getNetElectricityFactor() {
        return 1 - this.ownElectricityConsumption / 100;
    }

    private getNetHeatFactor() {
        return 1 - this.ownHeatConsumption / 100;
    }
}
