import {
    Alert,
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { StateContext } from '../state/StateProvider';
import { SimulatorApi } from './api/SimulatorApi';
import { ResultDTO } from './api/Dto';
import { DayChart } from './charts/DayChart';
import { HourlyResultRow, Result } from '../state/types';

export const Section: React.FC<{ title: string }> = ({title, children}) => (
    <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            {children}
        </CardContent>
    </Card>
);

export const SimulationResults = () => {
    const {powerPlants} = useContext(StateContext);
    const [result, setResult] = useState<Result | null>(null);
    const [status, setStatus] = useState<'LOADING' | 'ERROR' | 'IDLE'>('IDLE');

    const handleCompute = async () => {
        try {
            setStatus('LOADING');
            const result = await SimulatorApi.simulate(2019, powerPlants);
            setResult(result);
            setStatus('IDLE');
        } catch (e) {
            console.error(e);
            setStatus('ERROR');
        }
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCompute}
                            disabled={powerPlants.length === 0}
                        >
                            Przelicz
                        </Button>
                    </Box>
                </Grid>
                {status === 'ERROR' && <Alert severity="error">Błąd przy przeliczaniu wartości!</Alert>}
                {result && (
                    <>
                        <Grid item xs={12} md={6}>
                            <Section title="Dzienny bilans energii">
                                <DayChart data={result.hourly} />
                            </Section>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Section title="Miesięczny bilans energii"></Section>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Section title="Podsumowanie"></Section>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                    </>
                )}
            </Grid>
            <Backdrop open={status === 'LOADING'}>
                <CircularProgress/>
            </Backdrop>
        </>
    );
};
