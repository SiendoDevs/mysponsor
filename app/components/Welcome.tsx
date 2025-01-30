"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trophy, Target, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const Welcome: React.FC = () => {
  const router = useRouter();
  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-black dark bg-[url('/assets/car-driver.png')] bg-no-repeat bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent mix-blend-multiply pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-4 animate-fade-in-up">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent font-racing pb-2">
            MySponsor
          </CardTitle>
          <CardDescription className="text-xl mx-auto font-normal text-muted-foreground pb-4">
            La plataforma que conecta pilotos con patrocinadores de todo el mundo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group hover:scale-105 transition-all duration-300 animate-fade-in-up">
              <div
                className="bg-card/50 p-8 rounded-xl shadow-lg backdrop-blur border border-border/50 space-y-4 hover:border-primary/50 transition-colors"
                style={{ minHeight: "300px" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Perfil Profesional</h3>
                <p className="text-muted-foreground">
                  Destaca tus logros y experiencia en una página profesional diseñada para impresionar.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300 animate-fade-in-up mb-8">
              <div
                className="bg-card/50 p-8 rounded-xl shadow-lg backdrop-blur border border-border/50 space-y-4 hover:border-primary/50 transition-colors"
                style={{ minHeight: "300px" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Objetivos Claros</h3>
                <p className="text-muted-foreground">
                  Define tus metas y presupuesto para atraer patrocinadores alineados con tu visión.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300 animate-fade-in-up">
              <div
                className="bg-card/50 p-8 rounded-xl shadow-lg backdrop-blur border border-border/50 space-y-4 hover:border-primary/50 transition-colors"
                style={{ minHeight: "300px" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Networking</h3>
                <p className="text-muted-foreground">
                  Conecta directamente con empresas interesadas en apoyar el deporte motor.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="default" className="flex items-center gap-2 text-md px-6 py-3">
              <User className="w-5 h-5" /> Soy Piloto
            </Button>
            <Button onClick={() => router.push('/ranking')} variant="outline" className="flex items-center gap-2 text-md px-6 py-3">
              Soy Patrocinador
            </Button>
          </div>


        </CardContent>
      </div>
    </div>
  );
};

export default Welcome;
