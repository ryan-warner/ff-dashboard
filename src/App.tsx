import { useAtomValue } from 'jotai'
import { airportData, editingLayout } from "./service/_service.config"
import { Responsive, WidthProvider } from "react-grid-layout";

import Header from "@/components/Header"
import InfoCard from '@/components/InfoCard'
import { Separator } from "@/components/ui/separator"

import { Plane } from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);
// use app.css in this directory
import "./app.css"

function App() {
  const airports = useAtomValue(airportData)
  const editing = useAtomValue(editingLayout)

  return (
    <div className='px-8 h-screen'>
      <Header />
      <Separator />
      {
        airports.length === 0 ? (
          <div className='flex flex-col gap-8 items-center h-3/4 justify-center'>
            <Plane size={64} />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-center text-3xl font-semibold select-none'>Select an airport code to continue</div>
            </div>
          </div>
        ) : (
          <div className='py-6'>
            <ResponsiveGridLayout
              className='layout w-full'
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
              rowHeight={375}
              containerPadding={[0, 0]}
              margin={[16, 16]}
              isResizable={false}
              isDraggable={!editing}
            >
              {airports.map((data, index) => (
                <div data-grid={{ x: index, y: 0, w: 1, h: 1 }} className='h-full' key={data.airport.identifier}>
                  <InfoCard data={data} />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        )
      }
    </div>
  )
}

export default App
