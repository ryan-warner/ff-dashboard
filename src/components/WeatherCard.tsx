import WeatherConditions, { CloudCoverage } from "@/model/WeatherConditions";
import { Badge } from "@/components/ui/badge";

function WeatherCard({ weather }: { weather: WeatherConditions }) {
    return (
        <div className="flex flex-col gap-2">
            <div className='flex justify-between'>
                <div className="text-xl font-semibold">Current Weather</div>
                <div>{`${weather.temperature} F | ${weather.relativeHumidity}% Humidity`}</div>
            </div>

            <div className="flex flex-col text-lg">
                <div className='font-semibold'>Atmospheric Conditions:</div>
                <div>{`${weather.cloudCoverage} ${(weather.cloudCoverage === CloudCoverage.SCT || weather.cloudCoverage === CloudCoverage.FEW) ? "clouds" : ''} with ${weather.visibility} SM visibility`}</div>
            </div>

            <div className="flex flex-col gap-1 text-lg">
                <div className='font-semibold'>Wind Forecast:</div>
                <div className="flex justify-start gap-4">
                    <Badge variant='default'>
                        <div className="flex flex-col items-center px-2 py-1">
                            <div className="font-semibold">{`${weather.wind.cardinalDirection}`}</div>
                            <div className="font-semibold">{`${weather.wind.speed} MPH`}</div>

                            <div className="opacity-50">Now</div>
                        </div>
                    </Badge>
                    {
                        weather.forecast.slice(1, 3).map((forecast) => {
                            const time = Math.abs((forecast.forecastPeriodStart as any) - (weather.currentPeriod as any)) / 1000
                            const hours = Math.floor(time / 3600).toString().padStart(2, '0')
                            const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0')

                            return (
                                <Badge key={forecast.forecastPeriodStart.toString()} variant='default'>
                                    <div className="flex flex-col items-center px-2 py-1">
                                        <div className="font-semibold">{`${forecast.wind.trueDirection}\u00b0`}</div>

                                        <div className='font-semibold'>{`${forecast.wind.speed} MPH`}</div>
                                        
                                        <div className="opacity-50">{`+${hours}:${minutes}`}</div>
                                    </div>
                                </Badge>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )

}

export default WeatherCard;