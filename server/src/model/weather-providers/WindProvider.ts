import { Hour } from '../energy-production-simulator/ProductionInYear';
import { Location } from '../Location';

export interface WindinessProvider {
    get: (year: number, location: Location) => Promise<Windiness>;
}

export interface WindRecord {
    date: Hour;
    windSpeed: number;
}

export class Windiness {
    constructor(private readonly records: WindRecord[]) {}

    get(date: Hour) {
        const record = this.records.find((r) => r.date.equals(date));
        return record ? record.windSpeed : NaN;
    }
}
