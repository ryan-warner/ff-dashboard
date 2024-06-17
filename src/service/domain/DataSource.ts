import WeatherConditions from "../../model/WeatherConditions";
import Airport from "../../model/Airport";

export default interface DataSource {
    fetchWeatherConditions(airportIdentifier: string): Promise<WeatherConditions>
    fetchAirportData(airportIdentifier: string): Promise<Airport>
    //fetchAirportCodes(): Promise<string[]>
}