export default interface WeatherConditions {
    temperature: number
    relativeHumidity: number
    cloudCoverage: CloudCoverage | null
    visibility: number
    currentPeriod: Date
    wind: Wind
    forecast: WeatherForecast[]
}

export interface WeatherForecast {
    forecastPeriodStart: Date
    wind: Wind
}

export interface Wind {
    speed: number,
    trueDirection: number,
    cardinalDirection: WindDirection
}

// N, NNE, ENE, E, ESE, SSE, S, SSW, WSW, W, WNW, NNW
export enum WindDirection {
    N = 'N',
    NNE = 'NNE',
    NE = 'NE',
    ENE = 'ENE',
    E = 'E',
    ESE = 'ESE',
    SE = 'SE',
    SSE = 'SSE',
    S = 'S',
    SSW = 'SSW',
    SW = 'SW',
    WSW = 'WSW',
    W = 'W',
    WNW = 'WNW',
    NW = 'NW',
    NNW = 'NNW'
}

export enum CloudCoverage {
    SKC = 'Clear',
    CLR = 'Clear',
    FEW = 'Few',
    SCT = 'Scattered',
    BKN = 'Broken',
    OVC = 'Overcast',
    VV = 'Vertical visibility'
}

// Alternative approach - probably a lot less readable
/* interface DirectionMapItem {
    direction: WindDirection
    bounds: {
        upper: number,
        lower: number,
        inclusive: boolean
    }
}

const directionMapping = [
    {
        direction: WindDirection.N,
        bounds: {
            upper: 0,
            lower: 0,
            inclusive: true
        }
    },
    {
        direction: WindDirection.NNE,
        bounds: {
            upper: 0,
            lower: 45,
            inclusive: false
        }
    },
    {
        direction: WindDirection.NNE,
        bounds: {
            upper: 0,
            lower: 45,
            inclusive: false
        }
    },
] */

export function compareCloudCoverage(a: CloudCoverage, b: CloudCoverage): CloudCoverage {
    let aIndex = Object.values(CloudCoverage).indexOf(a)
    let bIndex = Object.values(CloudCoverage).indexOf(b)

    return aIndex > bIndex ? a : b
}

export function windDirectionHelper(trueDirection: number): WindDirection {
    if (trueDirection === 0) {
        return WindDirection.N
    } else if (trueDirection < 45) {
        return WindDirection.NNE
    } else if (trueDirection == 45) {
        return WindDirection.NE
    } else if (trueDirection < 90) {
        return WindDirection.ENE
    } else if (trueDirection == 90) {
        return WindDirection.E
    } else if (trueDirection < 135) {
        return WindDirection.ESE
    } else if (trueDirection == 135) {
        return WindDirection.SE
    } else if (trueDirection < 180) {
        return WindDirection.SSE
    } else if (trueDirection === 180) {
        return WindDirection.S
    } else if (trueDirection === 180) {
        return WindDirection.S
    } else if (trueDirection < 225) {
        return WindDirection.SSW
    } else if (trueDirection == 225) {
        return WindDirection.SW
    } else if (trueDirection < 270) {
        return WindDirection.WSW
    } else if (trueDirection == 270) {
        return WindDirection.W
    } else if (trueDirection < 315) {
        return WindDirection.WNW
    } else if (trueDirection == 315) {
        return WindDirection.NW
    } else if (trueDirection < 360) {
        return WindDirection.NNW
    } else {
        return WindDirection.N
    }
}

export function cloudCoverageHelper(coverage: string): CloudCoverage {
    switch (coverage.toUpperCase()) {
        case 'SKC':
            return CloudCoverage.SKC
        case 'CLR':
            return CloudCoverage.CLR
        case 'FEW':
            return CloudCoverage.FEW
        case 'SCT':
            return CloudCoverage.SCT
        case 'BKN':
            return CloudCoverage.BKN
        case 'OVC':
            return CloudCoverage.OVC
        case 'VV':
            return CloudCoverage.VV
        default:
            console.error('Unknown cloud coverage type: ' + coverage)
            // Shouldn't happen - but could - this was a quick FAA lookup of cloud coverage types
            return CloudCoverage.CLR
    }
}
