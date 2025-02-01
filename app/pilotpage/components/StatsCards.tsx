"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Flag, Star } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StatsCardsProps {
  age: number;
  experience: number;
  onAddSocial: () => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ age, experience, onAddSocial }) => {
  return (
    <div className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white">Estadísticas</CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Age */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-6 flex items-center gap-4">
          <Timer className="w-8 h-8 text-zinc-200" />
          <div>
            <p className="text-gray-400">Edad</p>
            <p className="text-2xl font-bold">{age} años</p>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-6 flex items-center gap-4">
          <Flag className="w-8 h-8 text-zinc-200" />
          <div>
            <p className="text-gray-400">Experiencia</p>
            <p className="text-2xl font-bold">{experience} año/s</p>
          </div>
        </div>

        {/* Social Rank */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-6 flex items-center gap-4">
          <Star className="w-8 h-8 text-zinc-200" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-gray-400">MySponsor Social Rank</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>Calculamos en base a tus seguidores en redes sociales</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="default" onClick={onAddSocial}>Añadir redes sociales</Button>
        </div>
      </CardContent>
    </div>
  );
};

export default StatsCards;
