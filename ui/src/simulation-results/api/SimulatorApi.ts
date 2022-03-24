import { PowerPlant, Result } from '../../state/types';
import { ResultDTO } from './Dto';
import { SimulatorResultsApiMapper } from './SimulatorResultsApiMapper';

export class SimulatorApi {
    static async simulate(year: number, powerPlants: PowerPlant[]): Promise<Result> {
        const API_ULR = import.meta.env.VITE_API_URL;
        const queryString = JSON.stringify(SimulatorResultsApiMapper.createQueryString(powerPlants));
        const query = new URLSearchParams({year: String(year), params: queryString});

        const result = await fetch(`${API_ULR}/energy-production?${query}`)
        const data: ResultDTO = await result.json();

        return SimulatorResultsApiMapper.mapDtoToResult(data);
    }
}