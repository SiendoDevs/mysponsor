"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PilotInfo } from "@/interfaces/interfacePilot";

interface EvaluationFormProps {
  onFormSubmit: (formData: PilotInfo) => void;
  initialData: PilotInfo;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  onFormSubmit,
  initialData,
}) => {
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [nickName, setNickName] = useState(initialData.nickName);
  const [experience, setExperience] = useState(
    initialData.experience ? String(initialData.experience) : "0"
  );
  const [desired_budget, setBudget] = useState(
    String(initialData.desired_budget).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";
    if (!lastName.trim()) newErrors.lastName = "El apellido es obligatorio.";
    if (!experience || isNaN(Number(experience)) || Number(experience) < 0) {
      newErrors.experience = "La experiencia debe ser un número positivo.";
    }
    if (
      !desired_budget ||
      isNaN(Number(desired_budget.replace(/\,/g, ""))) ||
      Number(desired_budget.replace(/\,/g, "")) < 0
    ) {
      newErrors.desired_budget = "El presupuesto debe ser un número positivo.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        firstName,
        lastName,
        nickName,
        experience,
        desired_budget: Number(desired_budget.replace(/\,/g, "")),
        name: `${firstName} ${lastName}`, // Construct the 'name' property
      };
      onFormSubmit(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black dark">
      <Card className="max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información Básica del Piloto</CardTitle>
            <CardDescription>Ingresa tus datos personales.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && (
                <p className="text-destructive text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && (
                <p className="text-destructive text-sm">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickName">Apodo</Label>
              <Input
                id="nickName"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">
                Experiencia en Karting ({experience} años)
              </Label>
              <Slider
                id="experience"
                min={0}
                max={20}
                step={1}
                value={[isNaN(Number(experience)) ? 0 : Number(experience)]}
                onValueChange={(value) => setExperience(value[0].toString())}
                className="py-4"
              />
              {errors.experience && (
                <p className="text-destructive text-sm">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Presupuesto Mensual</Label>
              <div className="relative">
                <Input
                  id="budget"
                  type="number"
                  value={desired_budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="pl-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="0"
                  step="10000"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ARS
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sugerencia: Entre $100.000 y $500.000 ARS
              </p>
              {errors.desired_budget && (
                <p className="text-destructive text-sm">
                  {errors.desired_budget}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Guardar y Continuar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EvaluationForm;
