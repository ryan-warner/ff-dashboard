import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"


import { dataSource, airportData, editingLayout } from "../service/_service.config"
import { ChangeEvent } from "react";

import { useAtom, atom } from 'jotai'
const valueAtom = atom('')

function Header() {
    const [value, setValue] = useAtom(valueAtom)
    const [airports, setAirportData] = useAtom(airportData)
    const [editing, setEditing] = useAtom(editingLayout)
    const { toast } = useToast()

    async function handleSetAirportData(airportCode: string) {
        // Look for airportCode in existing data
        if ((airports.length > 0) && (airports.find((airport) => airport.airport.identifier === airportCode.toUpperCase()))) {
            toast({
                title: 'Airport already added',
                description: `Airport ${airportCode.toUpperCase()} has already been added to the dashboard. Try a different airport code.`,
                variant: 'destructive'
            })
            return
        }
        let results
        try {
            results = {
                airport: await dataSource.fetchAirportData(airportCode.toUpperCase()),
                weather: await dataSource.fetchWeatherConditions(airportCode.toUpperCase())
            }
            toast({
                title: 'Airport added',
                description: `Airport ${value.toUpperCase()} has been added to the dashboard`,
            })
        } catch (error) {
            toast({
                title: 'Airport not found',
                description: `Airport ${airportCode.toUpperCase()} could not be found. Try another airport code.`,
                variant: 'destructive'
            })
        }
        
        if (results) {
            setAirportData([...airports, results])
        }
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    function handleClick() {
        handleSetAirportData(value)
        setValue('')
    }

    return (
        <div className='flex justify-between items-center py-6'>
            <div className='text-3xl font-bold select-none'>
                Airport Weather Dashboard
            </div>
            <div className="flex items-center gap-4">
                <Input value={value} placeholder="Search for an airport..." onChange={handleChange}/>
                <Button onClick={handleClick}>
                    Search
                </Button>
                <Button variant='destructive' onClick={() => setEditing(!editing)}>
                    Edit Layout
                </Button>
            </div>
        </div>
    )
}

export default Header