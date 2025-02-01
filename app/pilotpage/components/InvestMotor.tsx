import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InvestMotor: React.FC = () => {
  // Establecemos el número de lugares disponibles para cada parte del equipo
  const [kartingSpots, setKartingSpots] = useState(10);
  const [helmetSpots, setHelmetSpots] = useState(10);
  const [suitSpots, setSuitSpots] = useState(10);

  // Función para reservar un lugar (decrementar el número de lugares)
  const handleReserve = (team: string) => {
    if (team === "karting" && kartingSpots > 0) {
      setKartingSpots(kartingSpots - 1);
    }
    if (team === "helmet" && helmetSpots > 0) {
      setHelmetSpots(helmetSpots - 1);
    }
    if (team === "suit" && suitSpots > 0) {
      setSuitSpots(suitSpots - 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Contenedor de las tarjetas con flexbox */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-xl font-bold text-white">Karting</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-300">Quedan {kartingSpots} lugares disponibles.</p>
            <Button
              variant="default"
              onClick={() => handleReserve("karting")}
              disabled={kartingSpots === 0}
            >
              {kartingSpots === 0 ? "Lugares agotados" : "Reservar lugar"}
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-xl font-bold text-white">Casco</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-300">Quedan {helmetSpots} lugares disponibles.</p>
            <Button
              variant="default"
              onClick={() => handleReserve("helmet")}
              disabled={helmetSpots === 0}
            >
              {helmetSpots === 0 ? "Lugares agotados" : "Reservar lugar"}
            </Button>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-xl font-bold text-white">Traje</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-300">Quedan {suitSpots} lugares disponibles.</p>
            <div>
            <Button
              variant="default"
              className=""
              onClick={() => handleReserve("suit")}
              disabled={suitSpots === 0}
            >
              {suitSpots === 0 ? "Lugares agotados" : "Reservar lugar"}
            </Button>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestMotor;
