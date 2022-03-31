import {
    Box,
    Button,
    Divider,
    FormHelperText,
    Grid, InputAdornment,
    TextField,
    TextFieldProps,
    Typography,
    useTheme,
} from '@mui/material';
import { Dialog } from '../common/Dialog';
import { Formik, FieldArray } from 'formik';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
} from 'recharts';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { object, string, array, number } from 'yup';
import { WindTurbine } from '../state/types';
import { MapInput } from '../common/MapInput';
import { DEFAULT_LOCATION } from '../common/DefaultLocation';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (windTurbine: Omit<WindTurbine, 'type' | 'color'>) => void;
    initialValues?: Values;
}

interface Values {
    id: string;
    location: { lat: number, lng: number };
    height: number;
    roughnessFactor: number;
    characteristic: number[];
}

const validationSchema = (existingIds: string[]) => object({
    id: string().required().notOneOf(existingIds),
    height: number().required().min(0),
    roughnessFactor: number().min(0).max(1).required(),
    characteristic: array().of(number().min(0).required()),
});

export const WindTurbineFormDialog: React.FC<Props> = ({onSave, open, onClose, initialValues}) => {
    const theme = useTheme();
    const {plantIds} = useContext(StateContext);
    const existingIds = initialValues ? plantIds.filter(id => id !== initialValues.id) : plantIds;
    return (
        <Dialog open={open} onClose={onClose} title="Turbina wiatrowa">
            <Formik<Values>
                validateOnChange={false}
                initialValues={initialValues || {
                    id: '',
                    location: DEFAULT_LOCATION,
                    height: 50,
                    roughnessFactor: 0.5,
                    characteristic: Array.from(new Array(36)).map((v) => 0),
                }}
                validationSchema={validationSchema(existingIds)}
                onSubmit={(values, {setSubmitting}) => {
                    const {
                        id,
                        location,
                        characteristic,
                        height,
                        roughnessFactor,
                    } = values;
                    const characteristicData = characteristic.reduce(
                        (object, value, index) => ({
                            ...object,
                            [index]: Number(value),
                        }),
                        {}
                    );
                    onSave({id, location, height, roughnessFactor, characteristic: characteristicData});
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
                        error: Boolean(errors[name]),
                    });

                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography mb={2}>Lokalizacja</Typography>
                                    <MapInput
                                        height={200}
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
                                        label="Wysokość"
                                        {...commonProps('height')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                                        }}
                                    />

                                    <TextField
                                        label="Współczynnik szorstkości (α)"
                                        {...commonProps('roughnessFactor')}
                                    />
                                </Grid>
                            </Grid>


                            <Typography mt={2}>Charakterystyka</Typography>
                            <Typography variant="caption" color="gray">
                                Podaj moc dla danej prędkości wiatru
                            </Typography>
                            <Grid container spacing={1} sx={{mt: 1}}>
                                <FieldArray
                                    name="characteristic"
                                    render={() =>
                                        values.characteristic.map(
                                            (_, index) => (
                                                <Grid item xs={4} sm={3} md={2} key={index}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        name={`characteristic.${index}`}
                                                        label={`${index} m/s`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={
                                                            values
                                                                .characteristic[
                                                                index
                                                                ]
                                                        }
                                                        InputProps={{
                                                            endAdornment: <InputAdornment
                                                                position="end">W</InputAdornment>
                                                        }}
                                                    />
                                                </Grid>
                                            )
                                        )
                                    }
                                />
                            </Grid>
                            {errors.characteristic &&
                            touched.characteristic && (
                                <FormHelperText color="error">
                                    {errors.characteristic}
                                </FormHelperText>
                            )}
                            <Box pt={4} display="flex" justifyContent="center">
                                <LineChart
                                    width={500}
                                    height={220}
                                    data={values.characteristic.map(
                                        (power, speed) => ({
                                            speed,
                                            power,
                                        })
                                    )}
                                >
                                    <CartesianGrid stroke="#ccc"/>
                                    <Line
                                        type="monotone"
                                        dataKey="power"
                                        stroke={theme.palette.primary.main}
                                        strokeWidth={3}
                                    />
                                    <XAxis dataKey="speed" unit="m/s"/>
                                    <YAxis
                                        unit="W"
                                        domain={[
                                            0,
                                            Math.max(
                                                ...values.characteristic.map(
                                                    (v) => Number(v)
                                                )
                                            ),
                                        ]}
                                    />
                                </LineChart>
                            </Box>

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
