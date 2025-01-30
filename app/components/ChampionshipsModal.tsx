"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChampionshipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (championshipData: any) => void;
}

const ChampionshipsModal: React.FC<ChampionshipsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [championshipName, setChampionshipName] = useState('');
  const [championshipYear, setChampionshipYear] = useState('');
  const [championshipCategory, setChampionshipCategory] = useState('');
  const [championshipPosition, setChampionshipPosition] = useState('');
  const [championshipPoints, setChampionshipPoints] = useState('');
  const [championshipBestResult, setChampionshipBestResult] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="championship-modal-description">
        <DialogHeader>
          <DialogTitle>Agregar Campeonato</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <label htmlFor="championshipName" className="block text-sm font-medium text-gray-700">Nombre del Campeonato</label>
          <input
            type="text"
            name="championshipName"
            id="championshipName"
            value={championshipName}
            onChange={(e) => setChampionshipName(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championshipYear" className="block text-sm font-medium text-gray-700">Año del Campeonato</label>
          <input
            type="number"
            name="championshipYear"
            id="championshipYear"
            value={championshipYear}
            onChange={(e) => setChampionshipYear(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championshipCategory" className="block text-sm font-medium text-gray-700">Categoría del Campeonato</label>
          <input
            type="text"
            name="championshipCategory"
            id="championshipCategory"
            value={championshipCategory}
            onChange={(e) => setChampionshipCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championshipPosition" className="block text-sm font-medium text-gray-700">Posición en el Campeonato</label>
          <input
            type="text"
            name="championshipPosition"
            id="championshipPosition"
            value={championshipPosition}
            onChange={(e) => setChampionshipPosition(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championshipPoints" className="block text-sm font-medium text-gray-700">Puntos Obtenidos</label>
          <input
            type="text"
            name="championshipPoints"
            id="championshipPoints"
            value={championshipPoints}
            onChange={(e) => setChampionshipPoints(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="championshipBestResult" className="block text-sm font-medium text-gray-700">Mejor Resultado</label>
          <input
            type="text"
            name="championshipBestResult"
            id="championshipBestResult"
            value={championshipBestResult}
            onChange={(e) => setChampionshipBestResult(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cerrar
          </Button>
          <Button onClick={() => onConfirm({ 
            name: championshipName, 
            year: championshipYear, 
            category: championshipCategory, 
            position: championshipPosition, 
            points: championshipPoints, 
            bestResult: championshipBestResult 
          })}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChampionshipsModal;