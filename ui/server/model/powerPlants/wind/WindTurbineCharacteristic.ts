export class WindTurbineCharacteristic {
    constructor(readonly characteristic: { [windSpeed: number]: number }) {}

    getEvaluatedPower(windSpeed: number) {
        if (windSpeed in this.characteristic) {
            return this.characteristic[windSpeed];
        }
        const closestKeys = this.getClosestKeys(windSpeed);

        if (closestKeys === null) {
            return 0;
        }

        const { lowerWindSpeed, higherWindSpeed } = closestKeys;

        const lowerPower = this.characteristic[lowerWindSpeed];
        const higherPower = this.characteristic[higherWindSpeed];

        const difference = higherWindSpeed - lowerWindSpeed;
        const higerDifference = higherWindSpeed - windSpeed;
        const lowerDifference = windSpeed - lowerWindSpeed;
        const higerWeight = difference - higerDifference;
        const lowerWeight = difference - lowerDifference;

        const weightedAverage =
            lowerPower * lowerWeight +
            (higherPower * higerWeight) / (higerWeight + lowerWeight);

        return weightedAverage;
    }

    private getClosestKeys(windSpeed: number) {
        const characterizedWindSpeedKeys = Object.keys(this.characteristic)
            .map(Number)
            .sort((a, b) => a - b);

        for (let i = 0; i < characterizedWindSpeedKeys.length; i++) {
            if (characterizedWindSpeedKeys[i] > windSpeed) {
                if (i === 0) {
                    return null;
                }
                return {
                    lowerWindSpeed: characterizedWindSpeedKeys[i - 1],
                    higherWindSpeed: characterizedWindSpeedKeys[i],
                };
            }
        }
        return null;
    }
}
