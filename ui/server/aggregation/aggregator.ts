import { ProductionRecord } from '../model/energy-production-simulator/ProductionInYear';
import { Production } from '../model/Production';

export interface AggregatedResults {
    hourly: Array<{ date: { year: number, month: number, day: number, hour: number }, [key: string]: Production | { year: number, month: number, day: number, hour: number } }>;
    monthly: Array<{ date: { year: number, month: number, day: number }, [key: string]: Production | { year: number, month: number, day: number } }>;
    total: Record<string, Production>;
}

export const aggregate = (simulationResult: Record<string, ProductionRecord[]>): AggregatedResults => {

    const hourly: Record<string, { date: { year: number, month: number, day: number, hour: number }, [key: string]: Production | { year: number, month: number, day: number, hour: number } }> = {};
    const monthly: Record<string, { date: { year: number, month: number, day: number }, [key: string]: Production | { year: number, month: number, day: number } }> = {};
    const total: Record<string, Production> = {};

    for (const id of Object.keys(simulationResult)) {
        for (const record of simulationResult[id]) {
            const dateStringHourly = `${record.date.year}-${record.date.month}-${record.date.day} ${record.date.hour}:00`;
            hourly[dateStringHourly] = {...hourly[dateStringHourly], date: record.date, [id]: record.production};

            const dateStringMonthly = `${record.date.year}-${record.date.month}-${record.date.day}`;
            if (monthly[dateStringMonthly]) {
                if (monthly[dateStringMonthly][id]) {
                    const newProduction = {...monthly[dateStringMonthly][id] as Production};
                    newProduction.producedElectricity += record.production.producedElectricity;
                    newProduction.producedHeat += record.production.producedHeat;
                    monthly[dateStringMonthly] = {...monthly[dateStringMonthly], [id]: newProduction}
                } else {
                    monthly[dateStringMonthly] = {...monthly[dateStringMonthly], [id]: record.production}
                }
            } else {
                monthly[dateStringMonthly] = {
                    date: {
                        year: record.date.year,
                        month: record.date.month,
                        day: record.date.day
                    },
                    [id]: record.production
                }
            }

            if (total[id]) {
                total[id] = {
                    producedElectricity: total[id].producedElectricity + record.production.producedElectricity,
                    producedHeat: total[id].producedHeat + record.production.producedHeat
                }
            } else {
                total[id] = record.production;
            }
        }
    }


    return {
        hourly: Object.values(hourly),
        monthly: Object.values(monthly),
        total,
    }
}