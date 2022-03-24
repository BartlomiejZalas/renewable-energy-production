import { Response, Request } from 'express';
import express from 'express';
import { mapDtoToPowerPlants } from './mapper';
import { EnergyProductionSimulator } from 'renewable-energy-production-model';

const app = express();
const port = process.env.PORT || 8080;

app.get('/power', async (req: Request, res: Response) => {
    try {
        const year = Number(req.query.year);
        const parametersDto = JSON.parse(req.query.params as string);
        const powerPlants = mapDtoToPowerPlants(parametersDto);

        const result = await EnergyProductionSimulator.simulateYear(year, powerPlants, () => null);

        res.json(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
