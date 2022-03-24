import { createContext, useState } from 'react';
import { WindTurbine, PowerPlant, PvNominalPower, PvEfficiency, BiogasPlant } from './types';

interface State {
    powerPlants: PowerPlant[];
    plantIds: string[];
    addWindTurbine: (windTurbine: Omit<WindTurbine, 'type'>) => void;
    addPvNominalPower: (pvNominalPower: Omit<PvNominalPower, 'type'>) => void;
    addPvEfficiency: (pvEfficiency: Omit<PvEfficiency, 'type'>) => void;
    addBiogasPlant: (biogasPlant: Omit<BiogasPlant, 'type'>) => void;
    deletePowerPlant: (id: string) => void;
}

const CNI = () => {
    throw new Error('Context not initialized!');
};

const initialValue = {
    powerPlants: [],
    plantIds: [],
    addWindTurbine: CNI,
    addPvNominalPower: CNI,
    addPvEfficiency: CNI,
    addBiogasPlant: CNI,
    deletePowerPlant: CNI,
};

export const StateContext = createContext<State>(initialValue);

export const StateProvider: React.FC = ({ children }) => {
    const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);

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

    return (
        <StateContext.Provider
            value={{
                powerPlants,
                addBiogasPlant,
                addPvNominalPower,
                addPvEfficiency,
                addWindTurbine,
                deletePowerPlant,
                plantIds }}
        >
            {children}
        </StateContext.Provider>
    );
};
