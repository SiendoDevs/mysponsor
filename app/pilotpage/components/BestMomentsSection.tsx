"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface BestMomentsSectionProps {
  bestPhotos: string[];
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
}

const BestMomentsSection: React.FC<BestMomentsSectionProps> = ({ bestPhotos, onUpload, onDelete }) => {
  return (
    <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
          <div>Mis Mejores Momentos</div>
          <Button variant="default">
            <Camera className="w-6 h-6 mr-2" />
            Subir Fotos
          </Button>
          <input type="file" className="hidden" onChange={onUpload} multiple />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {bestPhotos.map((photo, index) => (
            <div key={index} className="relative">
              <Image src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover aspect-square" />
              <button onClick={() => onDelete(index)} className="absolute top-0 right-0 m-2 bg-red-500 text-white p-2 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BestMomentsSection;
