import { Delete } from '@mui/icons-material';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
} from '@mui/material';
import { useContext } from 'react';
import { AddPowerPlant } from './AddPowerPlant';
import { StateContext } from '../state/StateProvider';

export const PowerPlants = () => {
    const { powerPlants, deletePowerPlant } = useContext(StateContext);

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                p={2}
            >
                <Typography variant="h5">Moce wytwórcze OZE</Typography>
                <AddPowerPlant />
            </Box>
            <Box sx={{ height: 242, overflowY: 'auto' }}>
                <Table size="small">
                    <TableBody>
                        {powerPlants.map(({ id }) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => deletePowerPlant(id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};
