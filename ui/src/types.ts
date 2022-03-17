import {
    BiogasPlant,
    Hour,
    PVAreaAndEfficiency,
    PvNominalPower,
    WindTurbine,
} from 'renewable-energy-production-model';

export type PowerPlant =
    | BiogasPlant
    | PVAreaAndEfficiency
    | PvNominalPower
    | WindTurbine;

export interface ProductionRecord {
    date: Hour;
    production: {
        producedElectricity: number;
        proucedHeat: number;
    };
}
