import {
    BiogasPlant,
    PVAreaAndEfficiency,
    PvNominalPower,
    WindTurbine,
} from './model';
import { ParamsDTO, PowerPlant } from './types';

export const mapDtoToPowerPlants = (
    paramsDto: ParamsDTO[]
): Record<string, PowerPlant> => {
    return paramsDto.reduce(
        (records, dto) => ({ ...records, [dto.name]: mapDtoToPowerPlant(dto) }),
        {}
    );
};

const mapDtoToPowerPlant = (dto: ParamsDTO) => {
    if (dto.type === 'BIOGAS_PLANT') {
        return new BiogasPlant(
            dto.methanePerHour,
            dto.methaneCaloricValue,
            dto.heatGeneratorEfficiency,
            dto.electricityGeneratorEfficiency,
            dto.ownHeatConsumption,
            dto.ownElectricityConsumption
        );
    }
    if (dto.type === 'WIND') {
        return new WindTurbine(
            dto.location,
            dto.characteristic,
            dto.height,
            dto.roughnessFactor
        );
    }
    if (dto.type === 'PV_EFFICIENCY') {
        return new PVAreaAndEfficiency(
            dto.location,
            dto.area,
            dto.efficiency,
            dto.azimuth,
            dto.angle
        );
    }
    if (dto.type === 'PV_POWER') {
        return new PvNominalPower(
            dto.location,
            dto.power,
            dto.azimuth,
            dto.angle
        );
    }
};
