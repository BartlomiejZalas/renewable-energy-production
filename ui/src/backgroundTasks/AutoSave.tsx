import { useContext, useEffect } from 'react';
import { useCompute } from '../simulation-results/useCompute';
import { StateContext } from '../state/StateProvider';
import { SimulatorResultsApiMapper } from '../simulation-results/api/SimulatorResultsApiMapper';

const AUTOSAVE_KEY = 'autosave';

export const AutoSave = () => {
    const {powerPlants, powerPlantsVersion, setPowerPlants} = useContext(StateContext);

    useEffect(() => {
        const data = localStorage.getItem(AUTOSAVE_KEY);
        if (data) {
            const dto = JSON.parse(data);
            setPowerPlants(SimulatorResultsApiMapper.mapQueryStringDtoToPowerPlants(dto));
        }
    }, []);

    useEffect(() => {
        if (powerPlantsVersion > 0) {
            const dto = SimulatorResultsApiMapper.createQueryString(powerPlants);
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dto));
        }
    }, [powerPlantsVersion])

    return null;
}