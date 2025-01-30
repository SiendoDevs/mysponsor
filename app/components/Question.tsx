"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface QuestionProps {
  onAnswer: (hasCompeted: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ onAnswer }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black dark">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Experiencia en Competencias</CardTitle>
          <CardDescription>Por favor indica si has participado en campeonatos</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onAnswer(true)}
              variant="outline"
              className="h-24 text-lg hover:border-primary/50"
            >
              Sí, he competido
            </Button>
            <Button
              onClick={() => onAnswer(false)}
              variant="outline" 
              className="h-24 text-lg hover:border-primary/50"
            >
              No, aún no
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
