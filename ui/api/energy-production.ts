import type { VercelRequest, VercelResponse } from '@vercel/node';
import { aggregate } from '../server/aggregation/aggregator';
import { mapDtoToPowerPlants } from '../server/mapper';
import { EnergyProductionSimulator } from '../server/model';

export default async (req: VercelRequest, res: VercelResponse) => {
    const year = Number(req.query.year);
    const parametersDto = JSON.parse(req.query.params as string);
    const powerPlants = mapDtoToPowerPlants(parametersDto);

    const result = await EnergyProductionSimulator.simulateYear(year, powerPlants, () => null);
    const aggregatedResult = aggregate(result);
    res.status(200).json(aggregatedResult);
}
