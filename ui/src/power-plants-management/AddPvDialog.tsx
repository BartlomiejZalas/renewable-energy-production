import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useContext, useState } from 'react';

import { Dialog } from '../common/Dialog';
import { PvEfficiencyForm } from './PvEfficiencyForm';
import { PvNominalPowerForm } from './PvNominalPowerForm';
import { StateContext } from '../state/StateProvider';

interface Props {
    open: boolean;
    onClose: () => void;
}

enum FormType {
    POWER = 'POWER',
    AREA = 'AREA',
}

export const AddPvDialog: React.FC<Props> = (props) => {
    const {addPvEfficiency, addPvNominalPower} = useContext(StateContext);
    const [form, setForm] = useState(FormType.POWER);
    return (
        <Dialog {...props} title="Dodaj instalację PV">
            <FormControl>
                <FormLabel>Zdefiniuj instalacje na podstawie:</FormLabel>
                <RadioGroup
                    value={form}
                    onChange={(e) => setForm(e.target.value as FormType)}
                    row
                >
                    <FormControlLabel
                        value={FormType.POWER}
                        control={<Radio/>}
                        label="Mocy nominalnej"
                    />
                    <FormControlLabel
                        value={FormType.AREA}
                        control={<Radio/>}
                        label="Powierzchni i sprawności"
                    />
                </RadioGroup>
            </FormControl>

            {form === FormType.POWER && (
                <PvNominalPowerForm onClose={props.onClose} onSave={addPvNominalPower}/>
            )}
            {form === FormType.AREA && (
                <PvEfficiencyForm onClose={props.onClose} onSave={addPvEfficiency}/>
            )}
        </Dialog>
    );
};
