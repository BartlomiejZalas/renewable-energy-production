export interface WindTurbine {
    type: 'WIND';
    id: string;
    location: { lat: number, lng: number };
    characteristic: { [windSpeed: number]: number };
    height: number;
    roughnessFactor: number;
}

export interface PvNominalPower {
    type: 'PV_POWER';
    id: string;
    azimuth: number;
    angle: number;
    location: { lat: number, lng: number };
    power: number;
}

export interface PvEfficiency {
    type: 'PV_EFFICIENCY';
    id: string;
    azimuth: number,
    angle: number
    location: { lat: number, lng: number };
    area: number,
    efficiency: number,
}

export interface BiogasPlant {
    type: 'BIOGAS_PLANT';
    id: string;
    methanePerHour: number,
    methaneCaloricValue: number,
    heatGeneratorEfficiency: number,
    electricityGeneratorEfficiency: number,
    ownHeatConsumption: number,
    ownElectricityConsumption: number,
}

export type PowerPlant = WindTurbine | PvNominalPower | PvEfficiency | BiogasPlant;

export interface Result{
    hourly: HourlyResultRow[];
}

export interface HourlyResultRow {
    id: string;
    date: { year: number, month: number, day: number, hour: number };
    production: { producedElectricity: number; producedHeat: number };
}