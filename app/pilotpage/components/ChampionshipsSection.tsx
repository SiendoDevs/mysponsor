"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trophy, Edit, Trash } from "lucide-react";
import { Championship } from "@/app/types";

interface ChampionshipsSectionProps {
  championships: Championship[];
  onAddChampionship: () => void;
  onEditChampionship: (championship: Championship) => void;
  onDeleteChampionship: (index: number) => void;
}

const ChampionshipsSection: React.FC<ChampionshipsSectionProps> = ({
  championships,
  onAddChampionship,
  onEditChampionship,
  onDeleteChampionship,
}) => {
  return (
    <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
          <div>Historial de Campeonatos</div>
          <Button variant="default" onClick={onAddChampionship}>
            <Trophy className="w-6 h-6 mr-2" />
            Agregar Campeonato
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              {["Nombre", "Año", "Categoría", "Posición", "Puntos", "Mejor Resultado", "Acciones"].map(
                (header) => (
                  <TableCell key={header} className="font-bold text-center text-white">
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {championships.map((championship, index) => (
              <TableRow key={index} className="border-gray-700">
                {Object.values(championship).map((value, i) => (
                  <TableCell key={i} className="text-center text-white">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="text-center text-white">
                  <Button variant="ghost" onClick={() => onEditChampionship(championship)}>
                    <Edit className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" onClick={() => onDeleteChampionship(index)}>
                    <Trash className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ChampionshipsSection;
