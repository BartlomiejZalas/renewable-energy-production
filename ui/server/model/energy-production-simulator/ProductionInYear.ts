import { Production } from '../Production';

export class Hour {
    constructor(
        readonly year: number,
        readonly month: number,
        readonly day: number,
        readonly hour: number
    ) {}

    equals(other: Hour) {
        return (
            other.year === this.year &&
            other.month === this.month &&
            other.day === this.day &&
            other.hour === this.hour
        );
    }
}

export interface ProductionRecord {
    date: Hour;
    production: Production;
}

export type ProductonInYear = Record<string, ProductionRecord[]>;
