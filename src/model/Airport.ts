export default interface Airport {
    identifier: string
    name: string
    availableRunways: string[]
    location: {
        latitude: number
        longitude: number
    }
    // More information as is available through the API
}