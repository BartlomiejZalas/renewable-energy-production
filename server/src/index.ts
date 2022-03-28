import { Response, Request } from 'express';
import express from 'express';
import { mapDtoToPowerPlants } from './mapper';
import { EnergyProductionSimulator } from './model';
import cors from 'cors';
import { aggregate } from './aggregation/aggregator';

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.get('/energy-production', async (req: Request, res: Response) => {
    try {
        const year = Number(req.query.year);
        const parametersDto = JSON.parse(req.query.params as string);
        const powerPlants = mapDtoToPowerPlants(parametersDto);

        const result = await EnergyProductionSimulator.simulateYear(year, powerPlants, () => null);
        const aggregatedResult = aggregate(result);

        res.json(aggregatedResult);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
