"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PilotHistory } from "@/app/types";

interface HistorySectionProps {
  pilotHistory: PilotHistory;
  onAddHistory: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ pilotHistory, onAddHistory }) => {
  return (
    <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
          <div>Datos Históricos</div>
          <Button variant="default" onClick={onAddHistory}>
            <Plus className="w-5 h-5" />
            Agregar Datos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(pilotHistory).map(([key, value]) => (
            <div key={key} className="bg-neutral-950 p-4 rounded-lg">
              <p className="text-lg text-white">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistorySection;
