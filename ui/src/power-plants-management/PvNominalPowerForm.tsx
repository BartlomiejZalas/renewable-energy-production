import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { Formik } from 'formik';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, number } from 'yup';
import { PvNominalPower } from '../state/types';

interface Props {
    onClose: () => void;
    onSave: (pv: Omit<PvNominalPower, 'type' | 'color'>) => void;
    initialValues?: PvNominalPowerFormValues;
}

export interface PvNominalPowerFormValues {
    id: string;
    lat: number;
    lng: number;
    power: number;
    azimuth: number;
    angle: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        lat: number().required().min(0),
        lng: number().required().min(0),
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
                lat: 0,
                lng: 0,
                power: 0,
                azimuth: 0,
                angle: 0,
            }}
            validationSchema={validationSchema(existingIds)}
            onSubmit={(values, {setSubmitting}) => {
                const {id, lat, lng, power, azimuth, angle} = values;
                onSave({
                    id, location: {lat, lng},
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
                        <TextField label="Nazwa" {...commonProps('id')} disabled={Boolean(initialValues)}/>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Lat"
                                    {...commonProps('lat')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Lng"
                                    {...commonProps('lng')}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Moc znamionowa"
                            {...commonProps('power')}
                        />

                        <TextField
                            label="Kąt nachylenia"
                            {...commonProps('angle')}
                        />

                        <TextField label="Azymut" {...commonProps('azimuth')} />

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
