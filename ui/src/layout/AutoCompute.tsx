import { useContext, useEffect } from "react";
import { useCompute } from "../simulation-results/useCompute";
import { StateContext } from "../state/StateProvider";

export const AutoCompute = () => {
    const {powerPlants, globalConfiguration, setResult} = useContext(StateContext);
    const {handleCompute} = useCompute();

    useEffect(() => {
        if (powerPlants.length === 0) {
            setResult(null);
        } else {
            handleCompute();
        }
    }, [powerPlants.length, globalConfiguration.year])

    return null;
}