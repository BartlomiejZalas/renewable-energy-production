import { Dialog } from '../common/Dialog';
import { PvEfficiencyForm, PvEfficiencyFormValues } from './PvEfficiencyForm';
import { PvEfficiency } from '../state/types';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (pv: Omit<PvEfficiency, 'type' | 'color'>) => void;
    initialValues?: PvEfficiencyFormValues;
}

export const PvEfficiencyDialog: React.FC<Props> = ({initialValues, onSave, onClose, open}) => {
    return (
        <Dialog open={open} onClose={onClose} title="Instalacja PV">
            <PvEfficiencyForm onClose={onClose} onSave={onSave} initialValues={initialValues}/>
        </Dialog>
    );
};
