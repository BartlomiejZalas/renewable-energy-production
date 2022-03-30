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
        date: { year: number; month: number; day: number; hour: number };
        [key: string]:
            | { producedElectricity: number; producedHeat: number }
            | { year: number; month: number; day: number; hour: number };
    }>;
}

export const DayChart: React.FC<Props> = ({ data }) => {
    const { getColorById, plantIds, globalConfiguration } =
        useContext(StateContext);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);

    const januaryFirstData = data
        .filter((data) => data.date.month === month && data.date.day === day)
        .map((data) => ({ ...data, date: `${data.date.hour}:00` }));

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
                &nbsp;
                <TextField
                    size="small"
                    select
                    onChange={(e) => setDay(Number(e.target.value))}
                    value={day}
                >
                    {Array.from(new Array(31).values()).map((_, i) => (
                        <MenuItem value={i + 1} key={i}>
                            {i + 1}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={500} height={400} data={januaryFirstData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    {plantIds.map((id) => (
                        <React.Fragment key={id}>
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
                        </React.Fragment>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
