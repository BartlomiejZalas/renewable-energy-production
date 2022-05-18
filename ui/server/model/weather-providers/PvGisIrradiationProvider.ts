import { Hour } from '../energy-production-simulator/ProductionInYear';
import { Location } from '../Location';
import {
    IrradiationProvider,
    Irradiation,
    IrradiationRecord,
} from './IrradiationProvider';
import fetch from 'cross-fetch';
import { WindRecord } from './WindProvider';

interface RecordDto {
    time: string;
    'G(i)': number;
}

interface ResponseDto {
    outputs: { hourly: RecordDto[] };
}

export class PvGisIrradiationProvider implements IrradiationProvider {
    async get(
        year: number,
        location: Location,
        azimuth: number,
        angle: number
    ): Promise<Irradiation> {
        const apiUrl = this.prepareUrl(location, year, azimuth, angle);
        const response = await fetch(apiUrl);
        const data: ResponseDto | {status: number, message: string} = await response.json();
        if ('message' in data) {
            throw new Error(data.message);
        }
        const irradiationRecords: IrradiationRecord[] = data.outputs.hourly.map(
            this.mapToRecords
        );
        return new Irradiation(irradiationRecords);
    }

    private prepareUrl(
        location: Location,
        year: number,
        azimuth: number,
        angle: number
    ) {
        return `https://re.jrc.ec.europa.eu/api/v5_2/seriescalc?lat=${location.lat}&lon=${location.lng}&outputformat=json&startyear=${year}&endyear=${year}&aspect=${azimuth}&angle=${angle}`;
    }

    private mapToRecords(output: RecordDto): IrradiationRecord {
        const dateString = output.time;
        const year = Number(dateString.slice(0, 4));
        const month = Number(dateString.slice(4, 6));
        const day = Number(dateString.slice(6, 8));
        const hour = Number(dateString.slice(9, 11));

        return {
            date: new Hour(year, month, day, hour),
            irradiation: output['G(i)'],
        };
    }
}
