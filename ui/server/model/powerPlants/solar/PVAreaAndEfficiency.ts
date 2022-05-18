import { Location } from '../../Location';
import { PV } from './Pv';

export class PVAreaAndEfficiency implements PV {
    constructor(
        private readonly location: Location,
        private readonly area: number,
        private readonly efficiency: number,
        private readonly azimuth: number,
        private readonly angle: number
    ) {}

    power(irradiation: number) {
        return irradiation * this.area * (this.efficiency / 100);
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
