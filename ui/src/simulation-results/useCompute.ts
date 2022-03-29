import { SimulatorApi } from './api/SimulatorApi';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';

export const useCompute = () => {
    const { powerPlants, setResult, globalConfiguration, setLoadingStatus } =
        useContext(StateContext);

    const handleCompute = async () => {
        try {
            setLoadingStatus('LOADING');
            const result = await SimulatorApi.simulate(
                globalConfiguration.year,
                powerPlants
            );
            setResult(result);
            setLoadingStatus('IDLE');
        } catch (e) {
            console.error(e);
            setLoadingStatus('ERROR');
        }
    };
    return { handleCompute };
};
