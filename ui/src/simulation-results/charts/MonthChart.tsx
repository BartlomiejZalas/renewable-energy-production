import React, { useContext, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Box, MenuItem, TextField } from '@mui/material';
import { StateContext } from '../../state/StateProvider';

interface Props {
    data: Array<{
        date: { year: number; month: number; day: number };
        [key: string]:
            | { producedElectricity: number; producedHeat: number }
            | { year: number; month: number; day: number };
    }>;
}

export const MonthChart: React.FC<Props> = ({ data }) => {
    const { getColorById, plantIds, globalConfiguration } =
        useContext(StateContext);
    const [month, setMonth] = useState(1);

    const monthData = data
        .filter((data) => data.date.month === month)
        .map((data) => ({ ...data, date: data.date.day }));

    return (
        <Box sx={{ width: '100%', height: 400, pb: 5 }}>
            <Box sx={{ mb: 2 }} display="flex" justifyContent="flex-end">
                <TextField
                    size="small"
                    select
                    onChange={(e) => setMonth(Number(e.target.value))}
                    value={month}
                >
                    <MenuItem value={1}>Styczeń</MenuItem>
                    <MenuItem value={2}>Luty</MenuItem>
                    <MenuItem value={3}>Marzec</MenuItem>
                    <MenuItem value={4}>Kwiecień</MenuItem>
                    <MenuItem value={5}>Maj</MenuItem>
                    <MenuItem value={6}>Czerwiec</MenuItem>
                    <MenuItem value={7}>Lipiec</MenuItem>
                    <MenuItem value={8}>Sierpień</MenuItem>
                    <MenuItem value={9}>Wrzesień</MenuItem>
                    <MenuItem value={10}>Październik</MenuItem>
                    <MenuItem value={11}>Listopad</MenuItem>
                    <MenuItem value={12}>Grudzień</MenuItem>
                </TextField>
            </Box>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={500} height={400} data={monthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    {plantIds.map((id) => (
                        <>
                            {globalConfiguration.showElectricity && (
                                <Bar
                                    dataKey={`${id}.producedElectricity`}
                                    stackId="electricity"
                                    fill={getColorById(id)}
                                    key={`electricity-${id}`}
                                    name={`${id} - elektryczność`}
                                />
                            )}
                            {globalConfiguration.showHeat && (
                                <Bar
                                    dataKey={`${id}.producedHeat`}
                                    stackId="heat"
                                    fill={getColorById(id)}
                                    key={`heat-${id}`}
                                    name={`${id} - ciepło`}
                                />
                            )}
                        </>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
