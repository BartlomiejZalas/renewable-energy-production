import { createContext, useState } from 'react';
import { WindTurbine, PowerPlant, PvNominalPower, PvEfficiency, BiogasPlant, Result } from './types';

interface State {
    powerPlants: PowerPlant[];
    windTurbines: WindTurbine[];
    pvs: Array<PvNominalPower | PvEfficiency>;
    biogasPowerPlants: BiogasPlant[];
    plantIds: string[];
    addWindTurbine: (windTurbine: Omit<WindTurbine, 'type'>) => void;
    addPvNominalPower: (pvNominalPower: Omit<PvNominalPower, 'type'>) => void;
    addPvEfficiency: (pvEfficiency: Omit<PvEfficiency, 'type'>) => void;
    addBiogasPlant: (biogasPlant: Omit<BiogasPlant, 'type'>) => void;
    deletePowerPlant: (id: string) => void;
    result: null | Result;
    setResult: (result: Result) => void;
}

const CNI = () => {
    throw new Error('Context not initialized!');
};

const initialValue = {
    powerPlants: [],
    windTurbines: [],
    pvs: [],
    biogasPowerPlants: [],
    plantIds: [],
    addWindTurbine: CNI,
    addPvNominalPower: CNI,
    addPvEfficiency: CNI,
    addBiogasPlant: CNI,
    deletePowerPlant: CNI,
    result: null,
    setResult: CNI,
};

export const StateContext = createContext<State>(initialValue);

export const StateProvider: React.FC = ({ children }) => {
    const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);
    const [result, setResult] = useState<Result | null>(null);

    const addWindTurbine = (windTurbine: Omit<WindTurbine, 'type'>) =>  {
        setPowerPlants(plants => [...plants, {type: 'WIND', ...windTurbine}])
    }

    const addPvNominalPower = (pvNominalPower: Omit<PvNominalPower, 'type'>) => {
        setPowerPlants(plants => [...plants, {type: 'PV_POWER', ...pvNominalPower}]);
    };

    const addPvEfficiency = (pvEfficiency: Omit<PvEfficiency, 'type'>) => {
        setPowerPlants(plants => [...plants, {type: 'PV_EFFICIENCY', ...pvEfficiency}]);
    };

    const addBiogasPlant = (biogasPlant: Omit<BiogasPlant, 'type'>) => {
        setPowerPlants(plants => [...plants, {type: 'BIOGAS_PLANT', ...biogasPlant}]);
    };

    const deletePowerPlant = (id: string) => {
        setPowerPlants((powerPlants) => powerPlants.filter((p) => p.id !== id));
    };

    const plantIds = powerPlants.map(p => p.id);

    const windTurbines = powerPlants.filter(p => p.type === 'WIND') as WindTurbine[];
    const pvs = powerPlants.filter(p => p.type === 'PV_POWER' || p.type === 'PV_EFFICIENCY') as Array<PvEfficiency | PvNominalPower>;
    const biogasPowerPlants = powerPlants.filter(p => p.type === 'BIOGAS_PLANT') as BiogasPlant[];

    return (
        <StateContext.Provider
            value={{
                powerPlants,
                windTurbines,
                pvs,
                biogasPowerPlants,
                addBiogasPlant,
                addPvNominalPower,
                addPvEfficiency,
                addWindTurbine,
                deletePowerPlant,
                plantIds,
                setResult,
                result,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
