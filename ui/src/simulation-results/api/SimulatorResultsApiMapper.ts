import { QueryParamsDto, ResultDTO } from './Dto';
import { HourlyResultRow, PowerPlant, Result } from '../../state/types';

export abstract class SimulatorResultsApiMapper {
    static createQueryString(powerPlants: PowerPlant[]): QueryParamsDto[] {
        return powerPlants.map(pp => ({...pp, name: pp.id, id: undefined}));
    }

    static mapDtoToResult(dto: ResultDTO): Result {
        return {
            hourly: Object.keys(dto.hourly)
                .reduce((array: HourlyResultRow[], id) => {
                return [
                    ...array,
                    ...dto.hourly[id].map((records) => ({...records, id}))
                ];
            }, [])
        };
    }
}