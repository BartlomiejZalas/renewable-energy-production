import { SimulatorApi } from './api/SimulatorApi';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';

export const useCompute = () => {
    const {powerPlants, setResult} = useContext(StateContext);

    const handleCompute = async (onStatusChange: (status: 'LOADING' | 'IDLE' | 'ERROR') => void) => {
        try {
            onStatusChange('LOADING');
            const result = await SimulatorApi.simulate(2019, powerPlants);
            setResult(result);
            onStatusChange('IDLE');
        } catch (e) {
            console.error(e);
            onStatusChange('ERROR');
        }
    };
    return {handleCompute}
}