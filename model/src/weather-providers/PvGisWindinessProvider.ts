import { Hour } from '../energy-production-simulator/ProductionInYear';
import { Location } from '../Location';
import fetch from 'cross-fetch';
import { Windiness, WindinessProvider, WindRecord } from './WindProvider';

interface RecordDto {
    time: string;
    WS10m: number;
}

interface ResponseDto {
    outputs: { hourly: RecordDto[] };
}

export class PvGisWindinessProvider implements WindinessProvider {
    async get(year: number, location: Location): Promise<Windiness> {
        const apiUrl = this.prepareUrl(location, year);
        const response = await fetch(apiUrl, {mode: 'cors'});
        const data: ResponseDto = await response.json();
        const windRecords: WindRecord[] = data.outputs.hourly.map(
            this.mapToRecords
        );
        return new Windiness(windRecords);
    }

    private prepareUrl(location: Location, year: number) {
        return `https://re.jrc.ec.europa.eu/api/v5_2/seriescalc?lat=${location.lat}&lon=${location.lng}&outputformat=json&startyear=${year}&endyear=${year}`;
    }

    private mapToRecords(output: RecordDto): WindRecord {
        const dateString = output.time;
        const year = Number(dateString.slice(0, 4));
        const month = Number(dateString.slice(4, 6));
        const day = Number(dateString.slice(6, 8));
        const hour = Number(dateString.slice(9, 11));

        return {
            date: new Hour(year, month, day, hour),
            windSpeed: output.WS10m,
        };
    }
}
