import React from 'react';
import { createContext, useState } from 'react';
import {
    WindTurbine,
    PowerPlant,
    PvNominalPower,
    PvEfficiency,
    BiogasPlant,
    Result,
} from './types';
import {
    generateBiogasColor, generatePowerPlantColor,
    generateSolarColor,
    generateWindColor,
} from './colors';

interface GlobalConfiguration {
    year: number;
    showElectricity: boolean;
    showHeat: boolean;
}

interface State {
    powerPlants: PowerPlant[];
    setPowerPlants: (powerPlants: PowerPlant[]) => void;
    powerPlantsVersion: number;
    windTurbines: WindTurbine[];
    pvs: Array<PvNominalPower | PvEfficiency>;
    biogasPowerPlants: BiogasPlant[];
    plantIds: string[];
    addWindTurbine: (windTurbine: Omit<WindTurbine, 'type' | 'color'>) => void;
    addPvNominalPower: (pvNominalPower: Omit<PvNominalPower, 'type' | 'color'>) => void;
    addPvEfficiency: (pvEfficiency: Omit<PvEfficiency, 'type' | 'color'>) => void;
    addBiogasPlant: (biogasPlant: Omit<BiogasPlant, 'type' | 'color'>) => void;
    deletePowerPlant: (id: string) => void;
    result: null | Result;
    setResult: (result: Result | null) => void;
    getColorById: (id: string) => string;
    globalConfiguration: GlobalConfiguration;
    setYear: (year: number) => void;
    setShowElectricity: (show: boolean) => void;
    setShowHeat: (year: boolean) => void;
    loadingStatus: 'LOADING' | 'ERROR' | 'IDLE';
    setLoadingStatus: (value: 'LOADING' | 'ERROR' | 'IDLE') => void;
}

const CNI = () => {
    throw new Error('Context not initialized!');
};

const initialValue = {
    powerPlants: [],
    setPowerPlants: CNI,
    powerPlantsVersion: 0,
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
    getColorById: CNI,
    globalConfiguration: {year: 2020, showElectricity: true, showHeat: true},
    setYear: CNI,
    setShowElectricity: CNI,
    setShowHeat: CNI,
    loadingStatus: 'IDLE' as const,
    setLoadingStatus: CNI,
};

export const StateContext = createContext<State>(initialValue);

export const StateProvider: React.FC = ({children}) => {
    const [loadingStatus, setLoadingStatus] = useState<'LOADING' | 'ERROR' | 'IDLE'>('IDLE');
    const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);
    const [powerPlantsVersion, setPowerPlantsVersion] = useState(0);
    const [result, setResult] = useState<Result | null>(initialValue.result);
    const [globalConfiguration, setGlobalConfiguration] = useState<GlobalConfiguration>(initialValue.globalConfiguration);

    const updatePowerPlantsVersion = () => setPowerPlantsVersion(v => v + 1);

    const addWindTurbine = (
        windTurbine: Omit<WindTurbine, 'type' | 'color'>
    ) => {
        setPowerPlants((plants) => [
            ...plants,
            {
                ...windTurbine,
                type: 'WIND',
                color: generatePowerPlantColor(windTurbines.length, 'WIND'),
            },
        ]);
        updatePowerPlantsVersion();
    };

    const addPvNominalPower = (
        pvNominalPower: Omit<PvNominalPower, 'type' | 'color'>
    ) => {
        setPowerPlants((plants) => [
            ...plants,
            {
                ...pvNominalPower,
                type: 'PV_POWER',
                color: generateSolarColor(pvs.length),
            },
        ]);
        updatePowerPlantsVersion();
    };

    const addPvEfficiency = (pvEfficiency: Omit<PvEfficiency, 'type' | 'color'>) => {
        setPowerPlants((plants) => [
            ...plants,
            {
                ...pvEfficiency,
                type: 'PV_EFFICIENCY',
                color: generateSolarColor(pvs.length),
            },
        ]);
        updatePowerPlantsVersion();
    };

    const addBiogasPlant = (biogasPlant: Omit<BiogasPlant, 'type' | 'color'>) => {
        setPowerPlants((plants) => [
            ...plants,
            {
                ...biogasPlant,
                type: 'BIOGAS_PLANT',
                color: generateBiogasColor(biogasPowerPlants.length),
            },
        ]);
        updatePowerPlantsVersion();
    };

    const editPowerPlant = (
        id: string,
        updated: Omit<PowerPlant, 'type' | 'color'>
    ) => {
        setPowerPlants((plants) => plants.map(p => p.id === id ? {...p, ...updated} : p))
        updatePowerPlantsVersion();
    };

    const deletePowerPlant = (id: string) => {
        setPowerPlants((powerPlants) => powerPlants.filter((p) => p.id !== id));
        updatePowerPlantsVersion();
    };

    const plantIds = powerPlants.map((p) => p.id);

    const windTurbines = powerPlants.filter(
        (p) => p.type === 'WIND'
    ) as WindTurbine[];
    const pvs = powerPlants.filter(
        (p) => p.type === 'PV_POWER' || p.type === 'PV_EFFICIENCY'
    ) as Array<PvEfficiency | PvNominalPower>;
    const biogasPowerPlants = powerPlants.filter(
        (p) => p.type === 'BIOGAS_PLANT'
    ) as BiogasPlant[];

    const getColorById = (id: string) =>
        powerPlants.find((p) => p.id === id)?.color || '#000000';

    const setShowHeat = (showHeat: boolean) =>
        setGlobalConfiguration((c) => ({...c, showHeat}));

    const setShowElectricity = (showElectricity: boolean) =>
        setGlobalConfiguration((c) => ({...c, showElectricity}));

    const setYear = (year: number) =>
        setGlobalConfiguration((c) => ({...c, year}));

    return (
        <StateContext.Provider
            value={{
                setPowerPlants,
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
                getColorById,
                globalConfiguration,
                setShowHeat,
                setShowElectricity,
                setYear,
                loadingStatus,
                setLoadingStatus,
                powerPlantsVersion,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
