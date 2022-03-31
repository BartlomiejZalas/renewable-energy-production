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
            this.methanePerHour *
            this.methaneCaloricValue *
            (this.electricityGeneratorEfficiency / 100)
        );
    }
    private getTotalHeatProduction() {
        return (
            this.methanePerHour *
            this.methaneCaloricValue *
            (this.heatGeneratorEfficiency / 100)
        );
    }

    private getNetElectricityFactor() {
        return 1 - (this.ownElectricityConsumption / 100);
    }

    private getNetHeatFactor() {
        return 1 - (this.ownHeatConsumption / 100);
    }
}
