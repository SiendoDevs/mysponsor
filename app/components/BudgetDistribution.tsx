"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetDistributionProps {
  desired_budget: number;
}

const BudgetDistribution: React.FC<BudgetDistributionProps> = ({ desired_budget }) => {
  const kartingPercentage = 0.5;
  const helmetPercentage = 0.3;
  const suitPercentage = 0.2;

  const kartingBudget = desired_budget * kartingPercentage;
  const helmetBudget = desired_budget * helmetPercentage;
  const suitBudget = desired_budget * suitPercentage;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black dark">
      <Card className="max-w-lg p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 dark:shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-foreground dark:text-white">
            ¡Así distribuimos tu presupuesto!
          </CardTitle>
          <p className="text-muted-foreground dark:text-gray-400 mt-2">Presupuesto: ${desired_budget.toFixed(2)}</p>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-lg font-medium dark:text-white">Karting</span>
              </div>
              <span className="text-lg font-bold text-blue-500">${kartingBudget.toFixed(2)}</span>
            </div>
            <div className="mt-2 bg-blue-900/20 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{width: '50%'}}></div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-lg font-medium dark:text-white">Casco</span>
              </div>
              <span className="text-lg font-bold text-green-500">${helmetBudget.toFixed(2)}</span>
            </div>
            <div className="mt-2 bg-green-900/20 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{width: '30%'}}></div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-lg font-medium dark:text-white">Traje</span>
              </div>
              <span className="text-lg font-bold text-purple-500">${suitBudget.toFixed(2)}</span>
            </div>
            <div className="mt-2 bg-purple-900/20 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{width: '20%'}}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetDistribution;