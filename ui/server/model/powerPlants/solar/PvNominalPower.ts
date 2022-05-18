import { Location } from '../../Location';
import { PV } from './Pv';

export class PvNominalPower implements PV {
    constructor(
        private readonly location: Location,
        private readonly nominalPower: number,
        private readonly azimuth: number,
        private readonly angle: number
    ) {}

    power(irradiation: number) {
        return (irradiation * this.nominalPower) / 1000;
    }

    getLocation() {
        return this.location;
    }

    getAzimuth() {
        return this.azimuth;
    }

    getAngle() {
        return this.angle;
    }

    get type() {
        return 'PV' as const;
    }
}
