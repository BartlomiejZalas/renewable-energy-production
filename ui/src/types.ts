import {
    BiogasPlant,
    PVAreaAndEfficiency,
    PvNominalPower,
    WindTurbine,
} from 'renewable-energy-production-model';

export type PowerPlant =
    | BiogasPlant
    | PVAreaAndEfficiency
    | PvNominalPower
    | WindTurbine;
