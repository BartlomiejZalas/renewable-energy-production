import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useState } from 'react';

import { Dialog } from '../common/Dialog';
import { PvAreaForm } from './PvAreaForm';
import { PvNominalPowerForm } from './PvNominalPowerForm';

interface Props {
    open: boolean;
    onClose: () => void;
}

enum FormType {
    POWER = 'POWER',
    AREA = 'AREA',
}

export const AddPv: React.FC<Props> = (props) => {
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
                        control={<Radio />}
                        label="Mocy nominalnej"
                    />
                    <FormControlLabel
                        value={FormType.AREA}
                        control={<Radio />}
                        label="Powierzchni i sprawności"
                    />
                </RadioGroup>
            </FormControl>

            {form === FormType.POWER && (
                <PvNominalPowerForm onClose={props.onClose} />
            )}
            {form === FormType.AREA && <PvAreaForm onClose={props.onClose} />}
        </Dialog>
    );
};
