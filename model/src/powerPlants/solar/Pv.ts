import { Location } from '../../Location';

export interface PV {
    type: 'PV';
    power: (irradiation: number) => number;
    getLocation: () => Location;
    getAzimuth: () => number;
    getAngle: () => number;
}

export const instanceOfPV = (object: any): object is PV => {
    return object.type === 'PV';
};
