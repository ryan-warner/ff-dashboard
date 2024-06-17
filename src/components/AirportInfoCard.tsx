import Airport from "@/model/Airport";
import { MapPin } from 'lucide-react'

// For runways!
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";

function AirportInfoCard({ airport }: { airport: Airport }) {
    return (
        <div className='flex flex-col'>
            <div className="text-xl font-semibold">{`${airport.name}`}</div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-between text-lg items-center">
                    <div>{airport.identifier.toUpperCase()}</div>
                    <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <div>{`${Math.abs(Math.round(airport.location.latitude * 10000)) / 10000} ${airport.location.latitude >= 0 ? 'N' : 'S'}, ${Math.abs(Math.round(airport.location.longitude * 10000)) / 10000} ${airport.location.longitude < 0 ? 'W' : 'E'}`}</div>
                    </div>

                </div>
                <Separator />
                <div className="flex flex-col text-lg">
                    <div className='font-semibold'>Available Runways:</div>
                    <div className='font-semibold flex gap-2 flex-wrap'>{
                        airport.availableRunways.map((runway) => <Badge key={runway} variant='default'>{runway}</Badge>)
                    }</div>
                </div>
            </div>
        </div>
    );
}

export default AirportInfoCard;