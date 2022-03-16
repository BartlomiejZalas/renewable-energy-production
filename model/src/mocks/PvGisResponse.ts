export const PVGisRawResponse = JSON.stringify({
    inputs: {
        location: {
            latitude: 45,
            longitude: 8,
            elevation: 250,
        },
        meteo_data: {
            radiation_db: 'PVGIS-SARAH2',
            meteo_db: 'ERA-Interim',
            year_min: 2020,
            year_max: 2020,
            use_horizon: true,
            horizon_db: null,
            horizon_data: 'DEM-calculated',
        },
        mounting_system: {
            fixed: {
                slope: {
                    value: 0,
                    optimal: false,
                },
                azimuth: {
                    value: 0,
                    optimal: false,
                },
                type: 'free-standing',
            },
        },
        pv_module: {
            technology: null,
            peak_power: null,
            system_loss: null,
        },
    },
    outputs: {
        hourly: [
            {
                time: '20200101:0010',
                'G(i)': 123.2,
                H_sun: 0,
                T2m: 1.53,
                WS10m: 3.61,
                Int: 0,
            },
            {
                time: '20200101:0110',
                'G(i)': 72.3,
                H_sun: 0,
                T2m: 0.8,
                WS10m: 0.76,
                Int: 0,
            },
        ],
    },
    meta: {
        inputs: {
            location: {
                description: 'Selected location',
                variables: {
                    latitude: {
                        description: 'Latitude',
                        units: 'decimal degree',
                    },
                    longitude: {
                        description: 'Longitude',
                        units: 'decimal degree',
                    },
                    elevation: {
                        description: 'Elevation',
                        units: 'm',
                    },
                },
            },
            meteo_data: {
                description: 'Sources of meteorological data',
                variables: {
                    radiation_db: {
                        description: 'Solar radiation database',
                    },
                    meteo_db: {
                        description:
                            'Database used for meteorological variables other than solar radiation',
                    },
                    year_min: {
                        description: 'First year of the calculations',
                    },
                    year_max: {
                        description: 'Last year of the calculations',
                    },
                    use_horizon: {
                        description: 'Include horizon shadows',
                    },
                    horizon_db: {
                        description: 'Source of horizon data',
                    },
                },
            },
            mounting_system: {
                description: 'Mounting system',
                choices: 'fixed, vertical_axis, inclined_axis, two_axis',
                fields: {
                    slope: {
                        description:
                            'Inclination angle from the horizontal plane',
                        units: 'degree',
                    },
                    azimuth: {
                        description:
                            'Orientation (azimuth) angle of the (fixed) PV system (0 = S, 90 = W, -90 = E)',
                        units: 'degree',
                    },
                },
            },
            pv_module: {
                description: 'PV module parameters',
                variables: {
                    technology: {
                        description: 'PV technology',
                    },
                    peak_power: {
                        description: 'Nominal (peak) power of the PV module',
                        units: 'kW',
                    },
                    system_loss: {
                        description: 'Sum of system losses',
                        units: '%',
                    },
                },
            },
        },
        outputs: {
            hourly: {
                type: 'time series',
                timestamp: 'hourly averages',
                variables: {
                    'G(i)': {
                        description:
                            'Global irradiance on the inclined plane (plane of the array)',
                        units: 'W/m2',
                    },
                    H_sun: {
                        description: 'Sun height',
                        units: 'degree',
                    },
                    T2m: {
                        description: '2-m air temperature',
                        units: 'degree Celsius',
                    },
                    WS10m: {
                        description: '10-m total wind speed',
                        units: 'm/s',
                    },
                    Int: {
                        description:
                            '1 means solar radiation values are reconstructed',
                    },
                },
            },
        },
    },
});
