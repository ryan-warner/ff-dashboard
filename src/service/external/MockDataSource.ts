import DataSource from "../domain/DataSource";

import { CloudCoverage, windDirectionHelper } from "../../model/WeatherConditions";
import WeatherConditions from "../../model/WeatherConditions";

import Airport from "../../model/Airport";

export default class MockDataSource implements DataSource {
    fetchWeatherConditions(airportIdentifier: string): Promise<WeatherConditions> {
        // Hash the airport identifier to simulate different weather conditions
        let hash = 0;
        for (let i = 0; i < airportIdentifier.length; i++) {
            hash = (hash << 5) - hash + airportIdentifier.charCodeAt(i);
            hash |= 0;
        }
        
        // No need to reject the promise, just need mock data
        return new Promise((resolve) => {
            resolve({
                temperature: hash % 40 - 20,
                relativeHumidity: Math.random() * 100,
                cloudCoverage: CloudCoverage.SCT,
                visibility: 10 * Math.random(),
                currentPeriod: new Date(),
                wind: {
                    speed: 10 * Math.random(),
                    trueDirection: 360 * Math.random(),
                    cardinalDirection: windDirectionHelper(360 * Math.random())
                },
                forecast: [
                    {
                        forecastPeriodStart: new Date(),
                        wind: {
                            speed: 10 * Math.random(),
                            trueDirection: 360 * Math.random(),
                            cardinalDirection: windDirectionHelper(360 * Math.random())
                        }
                    },
                    {
                        forecastPeriodStart: new Date(),
                        wind: {
                            speed: 10 * Math.random(),
                            trueDirection: 360 * Math.random(),
                            cardinalDirection: windDirectionHelper(360 * Math.random())
                        }
                    }
                ]
            });
        });
    }

    // Same as above
    fetchAirportData(airportIdentifier: string): Promise<Airport> {
        return new Promise((resolve) => {
            resolve({
                identifier: airportIdentifier,
                name: "Foreflight Airport",
                location: {
                    latitude: Math.random() * 90,
                    longitude: Math.random() * 180
                },
                availableRunways: ["01", "19"],
            });
        });
    }

    // Same as above
    fetchAirportCodes(): Promise<string[]> {
        return new Promise((resolve) => {
            resolve(["KTPA", "KSFO", "KJFK", "KLAX", "KORD", "KDFW", "KDEN", "KATL", "KSFO", "KSEA", "KMIA"]);
        });
    }
}