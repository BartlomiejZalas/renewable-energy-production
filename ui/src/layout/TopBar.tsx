import React, { useContext, useState } from 'react';
import { AppBar, Backdrop, CircularProgress, Toolbar, Typography } from '@mui/material';
import { drawerWidth } from './constants';
import { useCompute } from '../simulation-results/useCompute';
import { StateContext } from '../state/StateProvider';
import { LoadingButton } from '@mui/lab';
import { Refresh } from '@mui/icons-material';

export const TopBar = () => {
    const {handleCompute} = useCompute();
    const [status, setStatus] = useState<'LOADING' | 'ERROR' | 'IDLE'>('IDLE');
    const {powerPlants} = useContext(StateContext);
    return (
        <>
            <AppBar position="fixed" sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                background: '#FFF',
                height: 70,
                borderLeft: 'none',
                borderTop: 'none'
            }} variant="outlined">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1, color: 'primary.main'}}>
                        Produkcja Energii
                    </Typography>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleCompute(setStatus)}
                        disabled={powerPlants.length === 0}
                        loading={status === 'LOADING'}
                        startIcon={<Refresh/>}
                    >
                        Przelicz
                    </LoadingButton>
                </Toolbar>
            </AppBar>
            <Backdrop open={status === 'LOADING'}>
                <CircularProgress/>
            </Backdrop>
        </>
    )
}