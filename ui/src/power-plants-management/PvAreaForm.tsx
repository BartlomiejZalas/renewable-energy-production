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

interface Props {
    onClose: () => void;
}

interface Values {
    id: string;
    lat: number;
    lng: number;
    area: number;
    efficiency: number;
    azimuth: number;
    angle: number;
}

const validationSchema = (existingIds: string[]) =>
    object({
        id: string().required().notOneOf(existingIds),
        lat: number().required().min(0),
        lng: number().required().min(0),
        area: number().required().min(0),
        efficiency: number().required().min(0).max(100),
        azimuth: number().required().min(0).max(360),
        angle: number().required().min(0).max(180),
    });

export const PvAreaForm: React.FC<Props> = (props) => {
    const {addPvEfficiency, plantIds} = useContext(StateContext);
    return (
        <Formik<Values>
            validateOnChange={false}
            initialValues={{
                id: '',
                lat: 0,
                lng: 0,
                area: 0,
                efficiency: 0,
                azimuth: 0,
                angle: 0,
            }}
            validationSchema={validationSchema(plantIds)}
            onSubmit={(values, {setSubmitting}) => {
                const {id, lat, lng, area, efficiency, azimuth, angle} =
                    values;
                addPvEfficiency({
                    id,
                    location: {lat, lng},
                    area,
                    efficiency,
                    azimuth,
                    angle
                });
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
                const commonProps = (name: keyof Values): TextFieldProps => ({
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
                            label="Powierzchnia"
                            {...commonProps('area')}
                        />

                        <TextField
                            label="Sprawność"
                            {...commonProps('efficiency')}
                        />

                        <TextField
                            label="Kąt nachylenia"
                            {...commonProps('angle')}
                        />

                        <TextField label="Azymut" {...commonProps('azimuth')} />

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
    );
};
