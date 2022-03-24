import {
    Box,
    Button,
    Divider,
    FormHelperText,
    Grid,
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

interface Props {
    open: boolean;
    onClose: () => void;
}

interface Values {
    id: string;
    lat: number;
    lng: number;
    height: number;
    roughnessFactor: number;
    characteristic: number[];
}

const validationSchema = (existingIds: string[]) => object({
    id: string().required().notOneOf(existingIds),
    lat: number().required().min(0),
    lng: number().required().min(0),
    height: number().required().min(0),
    roughnessFactor: number().min(0).max(1).required(),
    characteristic: array().of(number().min(0).required()),
});

export const AddWindTurbine: React.FC<Props> = (props) => {
    const theme = useTheme();
    const {addWindTurbine, plantIds} = useContext(StateContext);
    return (
        <Dialog {...props} title="Dodaj turbinę wiatrową">
            <Formik<Values>
                validateOnChange={false}
                initialValues={{
                    id: '',
                    lat: 0,
                    lng: 0,
                    height: 50,
                    roughnessFactor: 0.5,
                    characteristic: Array.from(new Array(31)).map((v) => 0),
                }}
                validationSchema={validationSchema(plantIds)}
                onSubmit={(values, {setSubmitting}) => {
                    const {
                        id,
                        lat,
                        lng,
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
                    addWindTurbine({id, location: {lat, lng}, height, roughnessFactor, characteristic: characteristicData});
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
                            <TextField label="Nazwa" {...commonProps('id')}/>

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
                                label="Wysokość"
                                {...commonProps('height')}
                            />

                            <TextField
                                label="Współczynnik szorstkości"
                                {...commonProps('roughnessFactor')}
                            />

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
                                                <Grid item xs={3} sm={2} md={1}>
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
