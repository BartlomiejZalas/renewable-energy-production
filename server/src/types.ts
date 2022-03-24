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

export type ParamsDTO =
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
          type: 'PV_AREA';
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
