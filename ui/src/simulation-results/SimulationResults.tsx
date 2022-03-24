import { CheckCircle } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { EnergyProductionSimulator } from 'renewable-energy-production-model';
import { StateContext } from '../state/StateProvider';
import { ProductionRecord } from '../types';

export const Section: React.FC<{ title: string }> = ({ title, children }) => (
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
    const { powerPlants } = useContext(StateContext);
    const [result, setResult] = useState<Record<
        string,
        ProductionRecord[]
    > | null>(null);
    const [finishedIds, setFinishedIds] = useState<string[]>([]);
    const [loading, setLoding] = useState(false);

    const handleCompute = async () => {
        setLoding(true);
        // const result = await EnergyProductionSimulator.simulateYear(
        //     2019,
        //     powerPlants.reduce((record, item) => {
        //         return { ...record, [item.id]: item.powerPlant };
        //     }, {}),
        //     (id) => setFinishedIds((finishedIds) => [...finishedIds, id])
        // );
        const result = await fetch('http://localhost:8080/power');
        setResult(result);
        setLoding(false);
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
                {result && (
                    <>
                        <Grid item xs={12} md={6}>
                            <Section title="Dzienny bilans energii"></Section>
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
            <Backdrop open={loading}>
                <Section title="Przeliczanie">
                    <Box
                        sx={{ width: 400 }}
                        display="flex"
                        justifyContent="center"
                    >
                        {finishedIds.map((id) => (
                            <Typography>
                                <CheckCircle color="primary" />
                                Przeliczono produkcję dla "{id}"
                            </Typography>
                        ))}
                        <CircularProgress />
                    </Box>
                </Section>
            </Backdrop>
        </>
    );
};
