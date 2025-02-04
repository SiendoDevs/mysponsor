"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PilotHistory } from "@/interfaces/interfacePilot"; // Import the PilotHistory type

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (historyData: PilotHistory) => void;
  initialData?: PilotHistory; // Optional initial data for editing
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
}) => {
  const [debutDate, setDebutDate] = useState("");
  const [championships, setChampionships] = useState(0);
  const [races, setRaces] = useState(0);
  const [lapRecords, setLapRecords] = useState(0);
  const [podiums, setPodiums] = useState(0);
  const [finalWins, setFinalWins] = useState(0);
  const [seriesWins, setSeriesWins] = useState(0);
  const [polePositions, setPolePositions] = useState(0);

  useEffect(() => {
    if (initialData) {
      setDebutDate(initialData.debutDate);
      setChampionships(initialData.championships);
      setRaces(initialData.races);
      setLapRecords(initialData.lapRecords);
      setPodiums(initialData.podiums);
      setFinalWins(initialData.finalWins);
      setSeriesWins(initialData.seriesWins);
      setPolePositions(initialData.polePositions);
    }
  }, [initialData]);

  const handleConfirm = () => {
    const historyData: PilotHistory = {
      debutDate,
      championships,
      races,
      lapRecords,
      podiums,
      finalWins,
      seriesWins,
      polePositions,
    };
    onConfirm(historyData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="history-modal-description">
        <DialogHeader>
          <DialogTitle>Datos Históricos</DialogTitle>
          <DialogDescription>
            Ingrese la información histórica del piloto.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <label htmlFor="debutDate" className="block text-sm font-medium text-gray-700">Debut</label>
          <input
            type="date"
            id="debutDate"
            value={debutDate}
            onChange={(e) => setDebutDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championships" className="block text-sm font-medium text-gray-700">Campeonatos</label>
          <input
            type="number"
            id="championships"
            value={championships}
            onChange={(e) => setChampionships(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="races" className="block text-sm font-medium text-gray-700">Carreras</label>
          <input
            type="number"
            id="races"
            value={races}
            onChange={(e) => setRaces(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lapRecords" className="block text-sm font-medium text-gray-700">Récords de vuelta</label>
          <input
            type="number"
            id="lapRecords"
            value={lapRecords}
            onChange={(e) => setLapRecords(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="podiums" className="block text-sm font-medium text-gray-700">Podios</label>
          <input
            type="number"
            id="podiums"
            value={podiums}
            onChange={(e) => setPodiums(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="finalWins" className="block text-sm font-medium text-gray-700">Victorias en finales</label>
          <input
            type="number"
            id="finalWins"
            value={finalWins}
            onChange={(e) => setFinalWins(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seriesWins" className="block text-sm font-medium text-gray-700">Victorias en series</label>
          <input
            type="number"
            id="seriesWins"
            value={seriesWins}
            onChange={(e) => setSeriesWins(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="polePositions" className="block text-sm font-medium text-gray-700">Pole positions</label>
          <input
            type="number"
            id="polePositions"
            value={polePositions}
            onChange={(e) => setPolePositions(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
