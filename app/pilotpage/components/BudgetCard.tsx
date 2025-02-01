import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


interface BudgetCardProps {
  desiredBudget: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ desiredBudget }) => {
  // Simulamos un valor de progreso (puedes cambiar esto si hay algún cálculo disponible)
  const progress = Math.min((desiredBudget / 100000) * 100, 100); // Simulamos un progreso basado en 100,000 como valor máximo

  return (
    <div className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-xl font-bold text-white">Presupuesto Deseado</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Presupuesto Actual */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-4 mb-4">
          <p className="text-gray-400">Meta de presupuesto</p>
          <p className="text-2xl font-bold">
            ${desiredBudget.toLocaleString()}
          </p>
        </div>

        {/* Progress */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500 mb-2">Progreso:</p>
          <Progress value={progress} max={100} />
        </div>

        {/* Progreso Final */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500">Progreso: {progress.toFixed(2)}%</span>
          <span className="text-sm font-semibold text-gray-700">
            ${desiredBudget.toLocaleString()} / ${desiredBudget.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </div>
  );
};

export default BudgetCard;
