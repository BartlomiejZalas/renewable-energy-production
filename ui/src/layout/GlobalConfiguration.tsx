import { useContext } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { StateContext } from '../state/StateProvider';

const AVAILABLE_YEARS = [
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020,
];

export const GlobalConfiguration = () => {
    const { globalConfiguration, setYear, setShowElectricity, setShowHeat } =
        useContext(StateContext);

    const { showElectricity, showHeat } = globalConfiguration;

    const show =
        showElectricity && showHeat
            ? 'HE'
            : showElectricity && !showHeat
            ? 'E'
            : 'H';

    const handleShowChange = (value: 'H' | 'E' | 'HE') => {
        if (value === 'H') {
            setShowElectricity(false);
            setShowHeat(true);
        }
        if (value === 'E') {
            setShowElectricity(true);
            setShowHeat(false);
        }
        if (value === 'HE') {
            setShowElectricity(true);
            setShowHeat(true);
        }
    };

    return (
        <Box display="flex">
            <TextField
                value={show}
                onChange={(e) =>
                    handleShowChange(e.target.value as 'H' | 'E' | 'HE')
                }
                size="small"
                select
                sx={{ mr: 2 }}
                label="Pokaż"
            >
                <MenuItem value="HE">Wszystko</MenuItem>
                <MenuItem value="H">Energia cieplna</MenuItem>
                <MenuItem value="E">Energia elektryczna</MenuItem>
            </TextField>

            <TextField
                value={globalConfiguration.year}
                onChange={(e) => setYear(Number(e.target.value))}
                size="small"
                select
                sx={{ mr: 2 }}
                label="Rok"
            >
                {AVAILABLE_YEARS.map((y) => (
                    <MenuItem key={y} value={y}>
                        {y}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};
