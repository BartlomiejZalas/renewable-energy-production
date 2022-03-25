import {
    Alert,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { useContext } from 'react';
import { StateContext } from '../state/StateProvider';
import { DayChart } from './charts/DayChart';

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
    const {result} = useContext(StateContext);

    if (result === null) {
        return <Alert severity="info">Brak danych</Alert>
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Section title="Dzienny bilans energii">
                        <DayChart data={result.hourly}/>
                    </Section>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Section title="Miesięczny bilans energii"></Section>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Section title="Podsumowanie"></Section>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </>
    );
};
