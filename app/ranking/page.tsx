"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react"; // Import the icons for the logo and slogan

interface Pilot {
  name: string;
  socialRanking: number;
  socialRankingChange: number; // Added to track the change in social ranking
  country: string;
  age: number;
  followers: number;
  followersChange: number; // Added to track the change in followers
  category: string;
  championships: number;
  series: number;
  finals: number;
}

const pilots: Pilot[] = [
  { name: "Juan Pérez", socialRanking: 89, socialRankingChange: 5, country: "Argentina", age: 25, followers: 10000, followersChange: 1000, category: "Karting", championships: 5, series: 10, finals: 20 },
  { name: "María López", socialRanking: 75, socialRankingChange: -3, country: "Chile", age: 22, followers: 8000, followersChange: -500, category: "Formula 3", championships: 3, series: 8, finals: 15 },
  { name: "Carlos García", socialRanking: 92, socialRankingChange: 2, country: "Colombia", age: 28, followers: 12000, followersChange: 1500, category: "Formula 1", championships: 7, series: 12, finals: 25 },
  { name: "Ana Martínez", socialRanking: 85, socialRankingChange: 1, country: "Uruguay", age: 24, followers: 9000, followersChange: 500, category: "Touring Cars", championships: 4, series: 9, finals: 18 },
  { name: "Luis Fernández", socialRanking: 78, socialRankingChange: -2, country: "Perú", age: 26, followers: 11000, followersChange: 1000, category: "Rally", championships: 6, series: 11, finals: 22 },
];

// Sort the pilots by social ranking in descending order
pilots.sort((a, b) => b.socialRanking - a.socialRanking);

const RankingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent font-racing pb-2">MySponsor</h1>
        <p className="text-lg italic text-muted-foreground ml-4">La plataforma que conecta pilotos con patrocinadores</p>
      </div>
      <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-white">Ranking de Pilotos</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableCell className="font-bold text-gray-300">Nombre</TableCell>
                <TableCell className="font-bold text-gray-300">Ranking Social</TableCell>
                <TableCell className="font-bold text-gray-300">Cambio</TableCell>
                <TableCell className="font-bold text-gray-300">País</TableCell>
                <TableCell className="font-bold text-gray-300">Edad</TableCell>
                <TableCell className="font-bold text-gray-300">Seguidores</TableCell>
                <TableCell className="font-bold text-gray-300">Cambio</TableCell>
                <TableCell className="font-bold text-gray-300">Categoría</TableCell>
                <TableCell className="font-bold text-gray-300">Campeonatos</TableCell>
                <TableCell className="font-bold text-gray-300">Series</TableCell>
                <TableCell className="font-bold text-gray-300">Finales</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pilots.map((pilot, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-800">
                  <TableCell className="text-gray-200">{pilot.name}</TableCell>
                  <TableCell className="text-gray-200">{pilot.socialRanking} pts.</TableCell>
                  <TableCell className="text-gray-200">{pilot.socialRankingChange > 0 ? <>+{pilot.socialRankingChange}<ArrowUp className="w-4 h-4 text-green-500" /></> : <>{pilot.socialRankingChange}<ArrowDown className="w-4 h-4 text-red-500" /></>}</TableCell>
                  <TableCell className="text-gray-200">{pilot.country}</TableCell>
                  <TableCell className="text-gray-200">{pilot.age}</TableCell>
                  <TableCell className="text-gray-200">{pilot.followers}</TableCell>
                  <TableCell className="text-gray-200">{pilot.followersChange > 0 ? <>+{pilot.followersChange}<ArrowUp className="w-4 h-4 text-green-500" /></> : <>{pilot.followersChange}<ArrowDown className="w-4 h-4 text-red-500" /></>}</TableCell>
                  <TableCell className="text-gray-200">{pilot.category}</TableCell>
                  <TableCell className="text-gray-200">{pilot.championships}</TableCell>
                  <TableCell className="text-gray-200">{pilot.series}</TableCell>
                  <TableCell className="text-gray-200">{pilot.finals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingPage; 