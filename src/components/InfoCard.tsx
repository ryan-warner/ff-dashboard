import AirportData from "@/model/AirportData";
import AirportInfoCard from "./AirportInfoCard";
import WeatherCard from "./WeatherCard";

import { Trash2 }from 'lucide-react'
import { Button } from "@/components/ui/button";
import { airportData, editingLayout } from "../service/_service.config"

import { useAtom } from 'jotai'


function InfoCard({ data }: { data: AirportData,}) {
    const [airports, setAirportData] = useAtom(airportData)
    const [editing, setEditing] = useAtom(editingLayout)

    function handleClick() {
        // Remove the airport from the list
        setAirportData(airports.filter((airport) => airport.airport.identifier !== data.airport.identifier))
        setEditing(false)
    }

    return (
        <div className='relative flex flex-col bg-slate-100 rounded-3xl shadow-md w-full py-2 px-4 h-full gap-3 overflow-visible'>
            <AirportInfoCard airport={data.airport} />
            <WeatherCard weather={data.weather} />
            {
                editing ? <Button className="z-50 rounded-full absolute top-0 right-0 -translate-y-1/4 translate-x-1/4" variant='destructive' onClick={handleClick}><Trash2 /></Button> : <></>
            }
        </div>
    );
}

export default InfoCard