import {
    KeyboardArrowDown,
    OilBarrel,
    SolarPower,
    WindPower,
} from '@mui/icons-material';
import { Button, MenuItem, Menu, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { BiogasPlantFormDialog } from './BiogasPlantFormDialog';
import { AddPvDialog } from './AddPvDialog';
import { WindTurbineFormDialog } from './WindTurbineFormDialog';
import { StateContext } from '../state/StateProvider';

enum Modal {
    NONE,
    PV,
    WIND,
    BIOGAS,
}

export const AddPowerPlant = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClose = () => setAnchorEl(null);

    const [showModal, setModal] = useState(Modal.NONE);
    const {addWindTurbine, addBiogasPlant} = useContext(StateContext);

    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
            >
                Dodaj
            </Button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        setModal(Modal.WIND);
                        handleClose();
                    }}
                    disableRipple
                >
                    <WindPower />
                    <Typography ml={2}>Turbina wiatorowa</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setModal(Modal.PV);
                        handleClose();
                    }}
                    disableRipple
                >
                    <SolarPower />
                    <Typography ml={2}>Panele PV</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setModal(Modal.BIOGAS);
                        handleClose();
                    }}
                    disableRipple
                >
                    <OilBarrel />
                    <Typography ml={2}>Biogazownia</Typography>
                </MenuItem>
            </Menu>
            <WindTurbineFormDialog
                open={showModal === Modal.WIND}
                onClose={() => setModal(Modal.NONE)}
                onSave={addWindTurbine}
            />
            <AddPvDialog
                open={showModal === Modal.PV}
                onClose={() => setModal(Modal.NONE)}
            />
            <BiogasPlantFormDialog
                open={showModal === Modal.BIOGAS}
                onClose={() => setModal(Modal.NONE)}
                onSave={addBiogasPlant}
            />
        </>
    );
};
