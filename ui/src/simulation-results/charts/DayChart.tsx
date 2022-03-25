import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type HourlyData =
    Array<{
        id: string;
        date: { year: number, month: number, day: number, hour: number },
        production: { producedElectricity: number; producedHeat: number }
    }>

const randColor = () => {
    const color = Math.floor(Math.random()*16777215).toString(16);
    return Math.floor(Math.random()*16777215).toString(16);
}

export const DayChart: React.FC<{ data: HourlyData }> = ({data}) => {

    const januaryFirstData = data.filter(data => data.date.month === 6 &&  data.date.day === 1);
    const daysData = januaryFirstData.reduce((days: Record<string, {[id: string]: number | string, date: string}>, row) => {
        const {date, id, production} = row;
        const dateString = `${date.year}-${date.month}-${date.day} ${date.hour}:00`;

        days[dateString] = {...days[dateString], date: dateString, [id]: production.producedElectricity}

        return days;
    }, {});

    const chartData = Object.values(daysData);
    const ids = Object.keys(chartData[0]).filter(key => key !== 'date');

    return (
            <BarChart
                width={500}
                height={300}
                data={chartData}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                {ids.map(id => <Bar dataKey={id} stackId="a" fill={`#${randColor()}`} key={id}/>)}
            </BarChart>
    )
}