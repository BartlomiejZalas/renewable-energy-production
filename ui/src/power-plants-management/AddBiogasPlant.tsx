import {
    Box,
    Button,
    Divider,
    TextField,
    TextFieldProps,
    useTheme,
} from '@mui/material';
import { Dialog } from '../common/Dialog';
import { Formik } from 'formik';
import { BiogasPlant } from 'renewable-energy-production-model';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, number } from 'yup';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface Values {
    id: string;
    methanePerHour: number;
    methaneCaloricValue: number;
    heatGeneratorEfficiency: number;
    electricityGeneratorEfficiency: number;
    ownHeatConsumption: number;
    ownElectricConsumption: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        methanePerHour: number().required().min(0),
        methaneCaloricValue: number().required().min(0),
        heatGeneratorEfficiency: number().required().min(0).max(100),
        electricityGeneratorEfficiency: number().required().min(0).max(100),
        ownHeatConsumption: number().required().min(0).max(100),
        ownElectricConsumption: number().required().min(0).max(100),
    });

export const AddBiogasPlant: React.FC<Props> = (props) => {
    const theme = useTheme();
    const { addPowerPlant, plantIds } = useContext(StateContext);
    return (
        <Dialog {...props} title="Dodaj biogazwonię">
            <Formik<Values>
                validateOnChange={false}
                initialValues={{
                    id: '',
                    methanePerHour: 0,
                    methaneCaloricValue: 0,
                    heatGeneratorEfficiency: 100,
                    electricityGeneratorEfficiency: 100,
                    ownHeatConsumption: 0,
                    ownElectricConsumption: 0,
                }}
                validationSchema={validationSchema(plantIds)}
                onSubmit={(values, { setSubmitting }) => {
                    const {
                        id,
                        methanePerHour,
                        methaneCaloricValue,
                        electricityGeneratorEfficiency,
                        heatGeneratorEfficiency,
                        ownHeatConsumption,
                        ownElectricConsumption,
                    } = values;

                    const powerPlant = new BiogasPlant(
                        methanePerHour,
                        methaneCaloricValue,
                        heatGeneratorEfficiency,
                        electricityGeneratorEfficiency,
                        ownHeatConsumption,
                        ownElectricConsumption
                    );

                    addPowerPlant({ id, powerPlant });
                    setSubmitting(false);
                    props.onClose();
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
                            <TextField label="Nazwa" {...commonProps('id')} />

                            <TextField
                                label={
                                    <span>
                                        m<sup>3</sup> metanu / h
                                    </span>
                                }
                                {...commonProps('methanePerHour')}
                            />
                            <TextField
                                label="Kaloryczność uzyskiwanego metanu"
                                {...commonProps('methaneCaloricValue')}
                            />
                            <TextField
                                label="Sprawność generatora ciepła"
                                {...commonProps('heatGeneratorEfficiency')}
                            />
                            <TextField
                                label="Sprawność generatora elektryczności"
                                {...commonProps(
                                    'electricityGeneratorEfficiency'
                                )}
                            />
                            <TextField
                                label="Zużycie własne ciepła"
                                {...commonProps('ownHeatConsumption')}
                            />
                            <TextField
                                label="użycie własne elektryczności"
                                {...commonProps('ownElectricConsumption')}
                            />
                            <Divider sx={{ py: 2, mb: 2 }} />
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={props.onClose}>Anuluj</Button>
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
