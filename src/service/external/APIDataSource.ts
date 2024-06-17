import DataSource from "../domain/DataSource";
import configureMeasurements from "convert-units";
import temperature from 'convert-units/definitions/temperature';
import speed from 'convert-units/definitions/speed';

const convertTemperature = configureMeasurements({
    temperature
});

const convertSpeed = configureMeasurements({
    speed
});

import WeatherConditions from "../../model/WeatherConditions";
import { windDirectionHelper, cloudCoverageHelper, compareCloudCoverage } from "../../model/WeatherConditions";
import Airport from "../../model/Airport";

export default class APIDataSource implements DataSource {
    async fetchWeatherConditions(airportIdentifier: string): Promise<WeatherConditions> {
        const response = await fetch(import.meta.env.VITE_API_URL + '/weather/report/' + airportIdentifier);
        
        if (!response.ok) {
            console.error('Failed to fetch weather data');
        }

        const result = await response.json();

        // TODO - Get the GREATEST amount of cloud coverage - define w enum and look through array
        return {
            temperature: Math.round(convertTemperature(result.report.conditions.tempC).from('C').to("F") as number * 100) / 100,
            relativeHumidity: result.report.conditions.relativeHumidity,
            cloudCoverage: result.report.conditions.cloudLayersV2.map((layer: any) => cloudCoverageHelper(layer.coverage)).reduce(compareCloudCoverage),
            visibility: result.report.conditions.visibility.distanceSm,
            wind: {
                speed: Math.round(convertSpeed(result.report.conditions.wind.speedKts).from('knot').to('mph') * 10) / 10,
                trueDirection: result.report.conditions.wind.direction,
                cardinalDirection: windDirectionHelper(result.report.conditions.wind.direction)
            },
            currentPeriod: new Date(result.report.conditions.dateIssued),
            forecast: result.report.forecast.conditions.map((forecast: any) => {
                return {
                    forecastPeriodStart: new Date(forecast.period.dateStart),
                    wind: {
                        speed: Math.round(convertSpeed(forecast.wind.speedKts).from('knot').to('mph') * 10) / 10,
                        trueDirection: forecast.wind.direction,
                        cardinalDirection: windDirectionHelper(forecast.wind.direction)
                    }
                }
            })
        };
    }

    async fetchAirportData(airportIdentifier: string): Promise<Airport> {
        // Print fill url
        let url = import.meta.env.VITE_API_URL + '/airports/' + airportIdentifier;
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Failed to fetch airport data');
        }

        const result = await response.json();
        return {
            identifier: result.icao,
            name: result.name,
            location: {
                latitude: result.latitude,
                longitude: result.longitude
            },
            availableRunways: result.runways.map((runway: any) => runway.ident)
        };
    }    
}