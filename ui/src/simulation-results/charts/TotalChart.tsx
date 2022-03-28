import React, { useContext } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, PieLabel } from 'recharts';
import { Box } from '@mui/material';
import { StateContext } from '../../state/StateProvider';

const renderCustomizedLabel: PieLabel = (props) => {
    const {cx, cy, midAngle, innerRadius, outerRadius, percent, value} = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="rgba(0, 0, 0, 0.75)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${value.toFixed(0)} (${(percent * 100).toFixed(2)}%)`}
        </text>
    );
};

interface Production {
    producedElectricity: number;
    producedHeat: number
}

interface Props {
    data: Record<string, Production>;
    type: keyof Production;
}

export const TotalChart: React.FC<Props> = ({data, type}) => {

    const {getColorById} = useContext(StateContext);
    const chartData = Object.keys(data).map(id => ({id, production: data[id][type]}));

    return (
        <Box sx={{width: '100%', height: 400, pb: 5}}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={400}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius="75%"
                        label={renderCustomizedLabel}
                        labelLine={false}
                        dataKey="production"
                    >
                        {chartData.map((entry) => (
                            <Cell key={entry.id} fill={getColorById(entry.id)} name={entry.id}/>
                        ))}
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}