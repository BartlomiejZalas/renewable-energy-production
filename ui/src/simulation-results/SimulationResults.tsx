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
import { MonthChart } from './charts/MonthChart';
import { TotalChart } from './charts/TotalChart';

export const Section: React.FC<{ title: string }> = ({title, children}) => (
    <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{mb: 2}}>
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
                        <DayChart data={result.hourly} />
                    </Section>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Section title="Miesięczny bilans energii">
                        <MonthChart data={result.monthly} />
                    </Section>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Section title="Roczny miks energetyczny (elektryczność)">
                        <TotalChart  data={result.total} type="producedElectricity"/>
                    </Section>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Section title="Roczny miks energetyczny (ciepło)">
                        <TotalChart  data={result.total} type="producedHeat"/>
                    </Section>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </>
    );
};
