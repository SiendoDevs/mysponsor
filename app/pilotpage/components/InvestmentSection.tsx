"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface InvestmentSectionProps {
  pilotName: string;
  desiredBudget: number;
  onInvest: () => void;
}

const InvestmentSection: React.FC<InvestmentSectionProps> = ({ pilotName, desiredBudget, onInvest }) => {
  return (
    <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-center mb-6 border border-gray-700">
      <Wallet className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-3xl font-regular text-white mb-4">¡Invierte en el Futuro!</h2>
      <p className="text-lg text-gray-300 mb-8">
        Apoya a {pilotName} en su carrera deportiva con una inversión desde ${" "}
        {desiredBudget ? (desiredBudget / 10).toLocaleString() : "10,000"} pesos.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="default" onClick={onInvest}>
          Invertir desde ${desiredBudget ? (desiredBudget / 10).toLocaleString() : "10,000"}
        </Button>
      </div>
    </Card>
  );
};

export default InvestmentSection;
