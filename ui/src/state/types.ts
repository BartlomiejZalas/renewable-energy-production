export interface WindTurbine {
    type: 'WIND';
    id: string;
    location: { lat: number, lng: number };
    characteristic: { [windSpeed: number]: number };
    height: number;
    roughnessFactor: number;
    color: string;
}

export interface PvNominalPower {
    type: 'PV_POWER';
    id: string;
    azimuth: number;
    angle: number;
    location: { lat: number, lng: number };
    power: number;
    color: string;
}

export interface PvEfficiency {
    type: 'PV_EFFICIENCY';
    id: string;
    azimuth: number,
    angle: number
    location: { lat: number, lng: number };
    area: number,
    efficiency: number,
    color: string;
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
    color: string;
}

export type PowerPlant = WindTurbine | PvNominalPower | PvEfficiency | BiogasPlant;

export interface Result{
    hourly: Array<{
        date: { year: number, month: number, day: number, hour: number },
        [key: string]: { producedElectricity: number; producedHeat: number } | { year: number, month: number, day: number, hour: number }
    }>;
    monthly: Array<{
        date: { year: number, month: number, day: number },
        [key: string]: { producedElectricity: number; producedHeat: number } | { year: number, month: number, day: number }
    }>;
    total: Record<string, { producedElectricity: number; producedHeat: number }>;
}