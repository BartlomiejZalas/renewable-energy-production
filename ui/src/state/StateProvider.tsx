import { createContext, useState } from 'react';
import { PowerPlant } from '../types';

interface State {
    powerPlants: Array<{ id: string; powerPlant: PowerPlant }>;
    plantIds: string[];
    addPowerPlant: (data: { id: string; powerPlant: PowerPlant }) => void;
    deletePowerPlant: (id: string) => void;
}

const CNI = () => {
    throw new Error('Context not initialized!');
};

const initialValue = {
    powerPlants: [],
    plantIds: [],
    addPowerPlant: CNI,
    deletePowerPlant: CNI,
};

export const StateContext = createContext<State>(initialValue);

export const StateProvider: React.FC = ({ children }) => {
    const [powerPlants, setPowerPlants] = useState<
        Array<{ id: string; powerPlant: PowerPlant }>
    >([]);

    const addPowerPlant = (data: { id: string; powerPlant: PowerPlant }) => {
        setPowerPlants((powerPlants) => [data, ...powerPlants]);
    };

    const deletePowerPlant = (id: string) => {
        setPowerPlants((powerPlants) => powerPlants.filter((p) => p.id !== id));
    };

    const plantIds = powerPlants.map(p => p.id);

    return (
        <StateContext.Provider
            value={{ powerPlants, addPowerPlant, deletePowerPlant, plantIds }}
        >
            {children}
        </StateContext.Provider>
    );
};
