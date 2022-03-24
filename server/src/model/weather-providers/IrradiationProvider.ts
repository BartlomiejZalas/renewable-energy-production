import { Hour } from '../energy-production-simulator/ProductionInYear';
import { Location } from '../Location';

export type NoData = string;

export interface IrradiationProvider {
    get: (
        year: number,
        location: Location,
        azimuth: number,
        angle: number
    ) => Promise<Irradiation>;
}

export interface IrradiationRecord {
    date: Hour;
    irradiation: number;
}

export class Irradiation {
    constructor(private readonly records: Array<IrradiationRecord>) {}

    get(date: Hour) {
        const record = this.records.find((r) => r.date.equals(date));
        return record ? record.irradiation : NaN;
    }
}
