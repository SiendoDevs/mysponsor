"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvest: (amount: number, type: string) => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ isOpen, onClose, onInvest }) => {
  const [amount, setAmount] = useState<number | string>("");
  const [investmentType, setInvestmentType] = useState<string>("");

  // Definir los mínimos de inversión
  const investmentMinimums: { [key: string]: number } = {
    karting: 10000,
    casco: 15000,
    traje: 20000,
    todos: 25000,
  };

  // Obtener el mínimo según el tipo de inversión seleccionado
  const minimumInvestment = investmentMinimums[investmentType] || 0;

  const handleInvest = () => {
    if (typeof amount === "number" && amount >= minimumInvestment) {
      onInvest(amount, investmentType);
      setAmount("");
      setInvestmentType("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Donde quieres ver tu marca?</DialogTitle>
          <DialogDescription>
            Selecciona el elemento donde publicitarás tu marca e ingresa la cantidad que deseas invertir en ARS.
          </DialogDescription>
        </DialogHeader>

        {/* Componente Select */}
        <Select value={investmentType} onValueChange={setInvestmentType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione un tipo de inversión" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="karting">Karting</SelectItem>
            <SelectItem value="casco">Casco</SelectItem>
            <SelectItem value="traje">Traje</SelectItem>
            <SelectItem value="todos">Todos</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Cantidad en ARS (mínimo ${minimumInvestment.toLocaleString()})`}
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleInvest}>Invertir</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal; 