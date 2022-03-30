import { QueryParamsDto, ResultDTO } from './Dto';
import { PowerPlant, Result } from '../../state/types';
import { generatePowerPlantColor, generateWindColor } from '../../state/colors';

export abstract class SimulatorResultsApiMapper {
    static createQueryString(powerPlants: PowerPlant[]): QueryParamsDto[] {
        return powerPlants.map(pp => ({...pp, name: pp.id, id: undefined}));
    }

    static mapQueryStringDtoToPowerPlants(dtos: QueryParamsDto[]): PowerPlant[] {
        return dtos.map((dto, index) => ({
            ...dto,
            id: dto.name,
            name: undefined,
            color: generatePowerPlantColor(index, dto.type)
        }));
    }

    static mapDtoToResult(dto: ResultDTO): Result {
        return dto;
    }
}