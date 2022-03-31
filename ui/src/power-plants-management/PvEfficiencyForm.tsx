import React from 'react';
import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment,
    TextField,
    TextFieldProps, Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, number } from 'yup';
import { PvEfficiency } from '../state/types';
import { DEFAULT_LOCATION } from '../common/DefaultLocation';
import { MapInput } from '../common/MapInput';

interface Props {
    onClose: () => void;
    onSave: (pv: Omit<PvEfficiency, 'type' | 'color'>) => void;
    initialValues?: PvEfficiencyFormValues;
}

export interface PvEfficiencyFormValues {
    id: string;
    location: { lat: number, lng: number };
    area: number;
    efficiency: number;
    azimuth: number;
    angle: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        area: number().required().min(0),
        efficiency: number().required().min(0).max(100),
        azimuth: number().required().min(0).max(360),
        angle: number().required().min(0).max(180),
    });

export const PvEfficiencyForm: React.FC<Props> = ({onClose, onSave, initialValues}) => {
    const {plantIds} = useContext(StateContext);
    const existingIds = initialValues ? plantIds.filter(id => id !== initialValues.id) : plantIds;
    return (
        <Formik<PvEfficiencyFormValues>
            validateOnChange={false}
            initialValues={initialValues || {
                id: '',
                location: DEFAULT_LOCATION,
                area: 0,
                efficiency: 0,
                azimuth: 0,
                angle: 0,
            }}
            validationSchema={validationSchema(existingIds)}
            onSubmit={(values, {setSubmitting}) => {
                const {id, location, area, efficiency, azimuth, angle} =
                    values;
                onSave({
                    id,
                    location,
                    area,
                    efficiency,
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
                const commonProps = (name: keyof PvEfficiencyFormValues): TextFieldProps => ({
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
                                    label="Powierzchnia"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>
                                    }}
                                    {...commonProps('area')}
                                />

                                <TextField
                                    label="Sprawność"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                                    }}
                                    {...commonProps('efficiency')}
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
