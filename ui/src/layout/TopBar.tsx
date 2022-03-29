import React, { useContext, useState } from 'react';
import {
    AppBar,
    Backdrop,
    CircularProgress,
    Toolbar,
    Typography,
} from '@mui/material';
import { drawerWidth } from './constants';
import { useCompute } from '../simulation-results/useCompute';
import { StateContext } from '../state/StateProvider';
import { LoadingButton } from '@mui/lab';
import { Refresh } from '@mui/icons-material';
import { GlobalConfiguration } from './GlobalConfiguration';

export const TopBar = () => {
    const { handleCompute } = useCompute();
    const { powerPlants, loadingStatus } = useContext(StateContext);
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    background: '#FFF',
                    height: 70,
                    borderLeft: 'none',
                    borderTop: 'none',
                }}
                variant="outlined"
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, color: 'primary.main' }}
                    >
                        Produkcja Energii
                    </Typography>
                    <GlobalConfiguration />
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleCompute()}
                        disabled={powerPlants.length === 0}
                        loading={loadingStatus === 'LOADING'}
                    >
                        <Refresh />
                    </LoadingButton>
                </Toolbar>
            </AppBar>
            <Backdrop
                open={loadingStatus === 'LOADING'}
                sx={{ zIndex: 9999, background: `rgba(255, 255, 255, 0.5)` }}
            >
                <CircularProgress />
            </Backdrop>
        </>
    );
};
