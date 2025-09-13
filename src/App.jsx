// src/App.jsx
import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card.jsx";

import { Gauge } from "lucide-react";
import GaugeChart from "react-gauge-chart";
import TrackChart from "./components/TrackChart";
import DefectStatus from "./components/DefectStatus";

export default function App() {
  const [data, setData] = useState({
    gauge: 0,
    distance: 0,
    alignment: 0,
    wearVertical: 0,
    wearLateral: 0,
    defects: false,
  });

  // Connect to ESP32 WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.4.1:81"); // ESP32 WebSocket server
    ws.onmessage = (event) => {
      try {
        const sensorData = JSON.parse(event.data);
        setData(sensorData);
      } catch (err) {
        console.error("Invalid JSON from ESP32:", err);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🚆 Railway Track Monitoring Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge Parameter */}
        <Card className="shadow-xl rounded-2xl p-4">
          <CardContent>
            <h2 className="font-bold text-xl mb-2">Gauge Parameter</h2>
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={20}
              percent={data.gauge / 2000} // assuming max gauge = 2000mm
              textColor="#000"
            />
            <p className="text-center mt-2">{data.gauge} mm</p>
          </CardContent>
        </Card>

        {/* Distance Between Rails */}
        <Card className="shadow-xl rounded-2xl p-4">
          <CardContent>
            <h2 className="font-bold text-xl mb-2">Distance Between Rails</h2>
            <p className="text-2xl text-center">{data.distance} mm</p>
          </CardContent>
        </Card>

        {/* Alignment */}
        <Card className="shadow-xl rounded-2xl p-4">
          <CardContent>
            <h2 className="font-bold text-xl mb-2">Track Alignment</h2>
            <TrackChart alignment={data.alignment} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Wear Measurement */}
        <Card className="shadow-xl rounded-2xl p-4">
          <CardContent>
            <h2 className="font-bold text-xl mb-2">Wear Measurement</h2>
            <p>Vertical Unevenness: {data.wearVertical} mm</p>
            <p>Lateral Unevenness: {data.wearLateral} mm</p>
          </CardContent>
        </Card>

        {/* Defect Detection */}
        <Card className="shadow-xl rounded-2xl p-4">
          <CardContent>
            <h2 className="font-bold text-xl mb-2">Internal Defects</h2>
            <DefectStatus status={data.defects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
