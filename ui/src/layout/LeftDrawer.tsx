import React, { PropsWithChildren, useContext } from 'react';
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    ArrowForwardIosSharp,
    Delete,
    ExpandMore,
    Info,
} from '@mui/icons-material';
import { StateContext } from '../state/StateProvider';
import { AddPowerPlant } from '../power-plants-management/AddPowerPlant';
import { drawerWidth } from './constants';
import styled from '@emotion/styled';
import {
    PowerPlant,
    WindTurbine,
    BiogasPlant,
    PvEfficiency,
    PvNominalPower,
} from '../state/types';

const Accordion = styled((props: PropsWithChildren<any>) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
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

const WindTurbineTooltip = (p: WindTurbine) => (
    <Box>
        <Typography>{p.id}</Typography>
        <Typography>Wysokość: {p.height}m</Typography>
        <Typography>Współczynnik szorstkości: {p.roughnessFactor}</Typography>
        <Typography>Lokalizacja lat: {p.location.lat} </Typography>
        <Typography>Lokalizacja lng: {p.location.lng}</Typography>
    </Box>
);

const PvTooltip = (p: PvNominalPower | PvEfficiency) => (
    <Box>
        <Typography>{p.id}</Typography>
        <Typography>Kąt nachylenia: {p.angle}°</Typography>
        <Typography>Azymut: {p.azimuth}°</Typography>
        <Typography>Lokalizacja lat: {p.location.lat} </Typography>
        <Typography>Lokalizacja lng: {p.location.lng}</Typography>
        {p.type === 'PV_POWER' && (
            <Typography>Moc nominalna: {p.power} Wp</Typography>
        )}
        {p.type === 'PV_EFFICIENCY' && (
            <Typography>Sprawność: {p.efficiency}%</Typography>
        )}
        {p.type === 'PV_EFFICIENCY' && (
            <Typography>
                Powierzchnia: {p.area} m<sup>2</sup>
            </Typography>
        )}
    </Box>
);

const BiogasTooltip = (p: BiogasPlant) => (
    <Box>
        <Typography>{p.id}</Typography>
        <Typography>
            Strumien metanu: {p.methanePerHour} m<sup>3</sup>/h
        </Typography>
        <Typography>Kaloryczność metanu: {p.methaneCaloricValue}</Typography>
        <Typography>
            Sprawność generatora elektrycznego:{' '}
            {p.electricityGeneratorEfficiency}%
        </Typography>
        <Typography>
            Sprawność generatora cieplnego: {p.heatGeneratorEfficiency}%
        </Typography>
        <Typography>
            Zużycie własne elektryczności: {p.ownElectricityConsumption}%
        </Typography>
        <Typography>Zużycie własne ciepła: {p.ownHeatConsumption}%</Typography>
    </Box>
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 16,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const LeftDrawer = () => {
    const { windTurbines, pvs, biogasPowerPlants, deletePowerPlant } =
        useContext(StateContext);

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
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
            >
                <Typography variant="subtitle1">Instalacje OZE</Typography>
                <AddPowerPlant />
            </Box>

            <Panel
                title="Turbiny wiatrowe"
                plants={windTurbines}
                onDelete={deletePowerPlant}
                subtitleGen={(p) =>
                    `Moc nominalna: ${Math.max(
                        ...Object.values(p.characteristic)
                    )}`
                }
                tooltipGen={WindTurbineTooltip}
            />

            <Panel
                title="Instalacje PV"
                plants={pvs}
                onDelete={deletePowerPlant}
                subtitleGen={(p) =>
                    p.type === 'PV_POWER'
                        ? `Moc nominalna: ${p.power}`
                        : p.type === 'PV_EFFICIENCY'
                        ? `Sprawność: ${p.efficiency}`
                        : undefined
                }
                tooltipGen={PvTooltip}
            />

            <Panel
                title="Biogazownie"
                plants={biogasPowerPlants}
                onDelete={deletePowerPlant}
                subtitleGen={(p) => `Metan: ${p.methanePerHour} m3/h`}
                tooltipGen={BiogasTooltip}
            />
        </Drawer>
    );
};

interface PanelProps<T extends PowerPlant> {
    plants: T[];
    title: string;
    subtitleGen: (plant: T) => string | undefined;
    tooltipGen: (plant: T) => React.ReactFragment;
    onDelete: (id: string) => void;
}

const Panel = <T extends PowerPlant>({
    plants,
    title,
    subtitleGen,
    tooltipGen,
    onDelete,
}: PanelProps<T>) => {
    if (plants.length === 0) {
        return null;
    }
    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                id={`${title}-power-plants`}
            >
                {title} ({plants.length})
            </AccordionSummary>
            <AccordionDetails>
                <List dense>
                    {plants.map((plant) => (
                        <ListItem key={plant.id}>
                            <ListItemText
                                primary={plant.id}
                                secondary={subtitleGen(plant)}
                            />
                            <IconButton onClick={() => onDelete(plant.id)}>
                                <Delete />
                            </IconButton>
                            <Tooltip
                                title={tooltipGen(plant)}
                                arrow
                                placement="right"
                            >
                                <IconButton>
                                    <Info />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};
