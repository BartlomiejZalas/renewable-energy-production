import {
    Box,
    Button,
    Divider, InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { Dialog } from '../common/Dialog';
import { Formik } from 'formik';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, number } from 'yup';
import { BiogasPlant } from '../state/types';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (windTurbine: Omit<BiogasPlant, 'type' | 'color'>) => void;
    initialValues?: Values;
}

interface Values {
    id: string;
    methanePerHour: number;
    methaneCaloricValue: number;
    heatGeneratorEfficiency: number;
    electricityGeneratorEfficiency: number;
    ownHeatConsumption: number;
    ownElectricityConsumption: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        methanePerHour: number().required().min(0),
        methaneCaloricValue: number().required().min(0),
        heatGeneratorEfficiency: number().required().min(0).max(100),
        electricityGeneratorEfficiency: number().required().min(0).max(100),
        ownHeatConsumption: number().required().min(0).max(100),
        ownElectricityConsumption: number().required().min(0).max(100),
    });

export const BiogasPlantFormDialog: React.FC<Props> = ({open, onClose, onSave, initialValues}) => {
    const {plantIds} = useContext(StateContext);
    const existingIds = initialValues ? plantIds.filter(id => id !== initialValues.id) : plantIds;

    return (
        <Dialog open={open} onClose={onClose} title="Dodaj biogazwonię">
            <Formik<Values>
                validateOnChange={false}
                initialValues={initialValues || {
                    id: '',
                    methanePerHour: 0,
                    methaneCaloricValue: 0,
                    heatGeneratorEfficiency: 100,
                    electricityGeneratorEfficiency: 100,
                    ownHeatConsumption: 0,
                    ownElectricityConsumption: 0,
                }}
                validationSchema={validationSchema(existingIds)}
                onSubmit={(values, {setSubmitting}) => {
                    onSave(values);
                    setSubmitting(false);
                    onClose();
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => {
                    const commonProps = (
                        name: keyof Values
                    ): TextFieldProps => ({
                        size: 'small',
                        fullWidth: true,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        margin: 'normal',
                        name,
                        value: values[name],
                        helperText: errors[name],
                        error: Boolean(errors[name] && touched[name]),
                    });

                    return (
                        <form onSubmit={handleSubmit}>
                            <TextField label="Nazwa" {...commonProps('id')} disabled={Boolean(initialValues)}/>

                            <TextField
                                label="Produkcja metanu"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m<sup>3</sup>&nbsp;metanu /
                                        h</InputAdornment>
                                }}
                                {...commonProps('methanePerHour')}
                            />
                            <TextField
                                label="Kaloryczność uzyskiwanego metanu"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">MJ/m<sup>3</sup></InputAdornment>
                                }}
                                {...commonProps('methaneCaloricValue')}
                            />
                            <TextField
                                label="Sprawność generatora ciepła"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                {...commonProps('heatGeneratorEfficiency')}
                            />
                            <TextField
                                label="Sprawność generatora elektryczności"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                {...commonProps(
                                    'electricityGeneratorEfficiency'
                                )}
                            />
                            <TextField
                                label="Zużycie własne ciepła"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                {...commonProps('ownHeatConsumption')}
                            />
                            <TextField
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                label="Zużycie własne elektryczności"
                                {...commonProps('ownElectricityConsumption')}
                            />
                            <Divider sx={{py: 2, mb: 2}}/>
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={onClose}>Anuluj</Button>
                                <Button
                                    variant="contained"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Zapisz
                                </Button>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
