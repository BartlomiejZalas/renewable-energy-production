import {
    Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import React, { PropsWithChildren, useContext } from 'react';
import { ArrowForwardIosSharp, Delete, ExpandMore } from '@mui/icons-material';
import { StateContext } from '../state/StateProvider';
import { AddPowerPlant } from '../power-plants-management/AddPowerPlant';
import { drawerWidth } from './constants';
import styled from '@emotion/styled';

const Accordion = styled((props: PropsWithChildren<any>) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: PropsWithChildren<any>) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: 16,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const LeftDrawer = () => {
    const {windTurbines, pvs, biogasPowerPlants, deletePowerPlant} = useContext(StateContext);

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <Typography variant="subtitle1">Instalacje OZE</Typography>
                <AddPowerPlant/>
            </Box>

            {windTurbines.length > 0 && (
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        id="wind-turbines"
                    >
                        Turbiny wiatrowe ({windTurbines.length})
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            {windTurbines.map(turbine => (
                                <ListItem key={turbine.id}>
                                    <ListItemText
                                        primary={turbine.id}
                                        secondary={`Moc nominalna: ${Math.max(...Object.values(turbine.characteristic))}`}
                                    />
                                    <IconButton onClick={() => deletePowerPlant(turbine.id)}>
                                        <Delete/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )}

            {pvs.length > 0 && (
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        id="pvs"
                    >
                        Instalacje PV ({pvs.length})
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            {pvs.map(pv => (
                                <ListItem key={pv.id}>
                                    <ListItemText
                                        primary={pv.id}
                                        secondary={pv.type === 'PV_POWER' ? `Moc nominalna: ${pv.power}` : pv.type === 'PV_EFFICIENCY' ? `Sprawność: ${pv.efficiency}` : undefined}
                                    />
                                    <IconButton onClick={() => deletePowerPlant(pv.id)}>
                                        <Delete/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )}

            {biogasPowerPlants.length > 0 && (
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        id="biogas-power-plants"
                    >
                        Biogazownie ({biogasPowerPlants.length})
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            {biogasPowerPlants.map(plant => (
                                <ListItem key={plant.id}>
                                    <ListItemText
                                        primary={plant.id}
                                        secondary={`Metan: ${plant.methanePerHour} m3/h`}
                                    />
                                    <IconButton onClick={() => deletePowerPlant(plant.id)}>
                                        <Delete/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )}
        </Drawer>
    )
}