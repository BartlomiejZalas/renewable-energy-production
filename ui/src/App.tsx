import React from 'react';
import { Box } from '@mui/material';
import { SimulationResults } from './simulation-results/SimulationResults';
import { LeftDrawer } from './layout/LeftDrawer';
import { TopBar } from './layout/TopBar';

const App = () => {
    return (
        <Box display="flex">
            <TopBar/>
            <LeftDrawer/>
                <Box component="main" sx={{flexGrow: 1, p: 4, mt: 10}}>
                    <SimulationResults/>
                </Box>
        </Box>
    );
};

export default App;
