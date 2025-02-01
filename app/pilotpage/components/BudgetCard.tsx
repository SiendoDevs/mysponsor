import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCardProps {
  desiredBudget: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ desiredBudget }) => {
  // Hardcoded progress value of 40%
  const progress = 40;

  return (
    <div className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
      <CardHeader className="border-b border-gray-700 relative">
        <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
          <div>Presupuesto Deseado</div>
          {/* Positioned top-right for the desired budget */}
          <div className="absolute top-0 right-0 p-4 text-2xl font-bold text-white">
            ${desiredBudget.toLocaleString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500 mb-2">Progreso:</p>
          <Progress value={progress} max={100} />
        </div>

        {/* Final Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500">
            Progreso: {progress}%
          </span>
          <span className="text-sm font-semibold text-gray-700">
            ${desiredBudget.toLocaleString()} / ${desiredBudget.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </div>
  );
};

export default BudgetCard;
