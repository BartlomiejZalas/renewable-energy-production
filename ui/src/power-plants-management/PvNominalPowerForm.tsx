import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment,
    TextField,
    TextFieldProps, Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, number } from 'yup';
import { PvNominalPower } from '../state/types';
import { MapInput } from '../common/MapInput';
import { DEFAULT_LOCATION } from '../common/DefaultLocation';

interface Props {
    onClose: () => void;
    onSave: (pv: Omit<PvNominalPower, 'type' | 'color'>) => void;
    initialValues?: PvNominalPowerFormValues;
}

export interface PvNominalPowerFormValues {
    id: string;
    location: { lat: number, lng: number };
    power: number;
    azimuth: number;
    angle: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        power: number().required().min(0),
        azimuth: number().required().min(0).max(360),
        angle: number().required().min(0).max(180),
    });

export const PvNominalPowerForm: React.FC<Props> = ({initialValues, onClose, onSave}) => {
    const {plantIds} = useContext(StateContext);
    const existingIds = initialValues ? plantIds.filter(id => id !== initialValues.id) : plantIds;

    return (
        <Formik<PvNominalPowerFormValues>
            validateOnChange={false}
            initialValues={initialValues || {
                id: '',
                location: DEFAULT_LOCATION,
                power: 0,
                azimuth: 0,
                angle: 0,
            }}
            validationSchema={validationSchema(existingIds)}
            onSubmit={(values, {setSubmitting}) => {
                const {id, location, power, azimuth, angle} = values;
                onSave({
                    id,
                    location,
                    power,
                    azimuth,
                    angle
                });
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
                  setFieldValue,
              }) => {
                const commonProps = (name: keyof PvNominalPowerFormValues): TextFieldProps => ({
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

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography mb={2}>Lokalizacja</Typography>
                                <MapInput
                                    value={values.location}
                                    onChange={(position) => {
                                        setFieldValue('location', position);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Dane</Typography>

                                <TextField label="Nazwa" {...commonProps('id')} disabled={Boolean(initialValues)}/>

                                <TextField
                                    label="Moc znamionowa"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Wp</InputAdornment>
                                    }}
                                    {...commonProps('power')}
                                />

                                <TextField
                                    label="Kąt nachylenia"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">°</InputAdornment>
                                    }}
                                    {...commonProps('angle')}
                                />

                                <TextField
                                    label="Azymut"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">°</InputAdornment>
                                    }}
                                    {...commonProps('azimuth')}
                                />
                            </Grid>
                        </Grid>



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
    );
};
