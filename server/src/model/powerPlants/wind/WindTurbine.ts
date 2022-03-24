import { Location } from '../../Location';
import { WindTurbineCharacteristic } from './WindTurbineCharacteristic';

export class WindTurbine {
    readonly characteristic: WindTurbineCharacteristic;

    constructor(
        private readonly location: Location,
        characteristicRaw: { [windSpeed: number]: number },
        private readonly height: number,
        private readonly roughnessFactor: number
    ) {
        this.characteristic = new WindTurbineCharacteristic(characteristicRaw);
    }

    power(windSpeed: number) {
        const windSpeedOnTop = this.getWindSpeedOnTop(windSpeed);
        const power = this.characteristic.getEvaluatedPower(windSpeedOnTop);

        return power;
    }

    getLocation() {
        return this.location;
    }

    private getWindSpeedOnTop(windSpeed: number) {
        return windSpeed * Math.pow(this.height / 10, this.roughnessFactor);
    }
}
