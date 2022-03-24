import { BiogasPlant } from './biogas/BiogasPlant';
import { PV } from './solar/Pv';
import { WindTurbine } from './wind/WindTurbine';

export type PowerPlant = PV | WindTurbine | BiogasPlant;
