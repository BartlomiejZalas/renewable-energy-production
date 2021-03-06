export type QueryParamsDto =
    | {
    type: 'BIOGAS_PLANT';
    name: string;
    methanePerHour: number;
    methaneCaloricValue: number;
    heatGeneratorEfficiency: number;
    electricityGeneratorEfficiency: number;
    ownHeatConsumption: number;
    ownElectricityConsumption: number;
}
    | {
    type: 'PV_EFFICIENCY';
    name: string;
    location: { lat: number; lng: number };
    area: number;
    efficiency: number;
    azimuth: number;
    angle: number;
}
    | {
    type: 'PV_POWER';
    name: string;
    location: { lat: number; lng: number };
    power: number;
    azimuth: number;
    angle: number;
}
    | {
    type: 'WIND';
    name: string;
    location: { lat: number; lng: number };
    characteristic: { [windSpeed: number]: number };
    height: number;
    roughnessFactor: number;
};

export interface ResultDTO {
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