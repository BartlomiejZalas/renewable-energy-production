import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { ConsumptionManagement } from './consumption-management/ConsumptionManagement';
import { PowerPlants } from './power-plants-management/PowerPlants';
import { SimulationResults } from './simulation-results/SimulationResults';

const App = () => {
    return (
        <>
            <Box py={4} sx={{background: '#FFF'}}>
                <Container>
                    <Typography variant="h4" component="h1">
                        Symulacja OZE
                    </Typography>
                </Container>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>
                            <PowerPlants />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <ConsumptionManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <SimulationResults />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default App;
