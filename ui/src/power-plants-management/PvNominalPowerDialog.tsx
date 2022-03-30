import { Dialog } from '../common/Dialog';
import { PvNominalPower } from '../state/types';
import { PvNominalPowerForm, PvNominalPowerFormValues } from './PvNominalPowerForm';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (pv: Omit<PvNominalPower, 'type' | 'color'>) => void;
    initialValues?: PvNominalPowerFormValues;
}

export const PvNominalPowerDialog: React.FC<Props> = ({initialValues, onSave, onClose, open}) => {
    return (
        <Dialog open={open} onClose={onClose} title="Instalacja PV">
            <PvNominalPowerForm onClose={onClose} onSave={onSave} initialValues={initialValues}/>
        </Dialog>
    );
};
