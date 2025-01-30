"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PilotDetails {
  birthDate: string;
  gender: string;
  location: string;
  countryCode: string;
  age: number;
}

interface PilotDetailsFormProps {
  onSubmit: (details: PilotDetails) => void;
  initialData: PilotDetails;
}

const PilotDetailsForm: React.FC<PilotDetailsFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [details, setDetails] = useState<PilotDetails>({
    age: initialData.age || 0,
    gender: initialData.gender || "",
    location: initialData.location || "",
    birthDate: initialData.birthDate || new Date().toISOString().split('T')[0],
    countryCode: initialData.countryCode || "",
  });

  useEffect(() => {
    setDetails(initialData);
  }, [initialData]);

  const handleChange = (name: keyof PilotDetails, value: any) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.birthDate || !details.gender || !details.location || details.age <= 0) {
      alert("Por favor completa todos los campos.");
      return;
    }
    localStorage.setItem("pilotDetails", JSON.stringify(details));
    onSubmit(details);
  };

  const countries = [
    { name: "Argentina", code: "AR" },
    { name: "Bolivia", code: "BO" },
    { name: "Brasil", code: "BR" },
    { name: "Chile", code: "CL" },
    { name: "Colombia", code: "CO" },
    { name: "Costa Rica", code: "CR" },
    { name: "Cuba", code: "CU" },
    { name: "Ecuador", code: "EC" },
    { name: "El Salvador", code: "SV" },
    { name: "Guatemala", code: "GT" },
    { name: "Honduras", code: "HN" },
    { name: "México", code: "MX" },
    { name: "Nicaragua", code: "NI" },
    { name: "Panamá", code: "PA" },
    { name: "Paraguay", code: "PY" },
    { name: "Perú", code: "PE" },
    { name: "República Dominicana", code: "DO" },
    { name: "Uruguay", code: "UY" },
    { name: "Venezuela", code: "VE" },
  ];

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      handleChange("location", country.name);
      handleChange("countryCode", country.code);
    }
  };

  // Generar años, meses y días
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen bg-black dark">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center space-y-4">
            <CardTitle>Detalles del Piloto</CardTitle>
            <CardDescription>Ingresa tus datos personales.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <div className="flex space-x-4">
                <Select
                  onValueChange={(value) => handleChange("birthDate", `${value}-${details.birthDate.split('-')[1]}-${details.birthDate.split('-')[2]}`)}
                  value={details.birthDate.split('-')[0]} // Año
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()} className="dark:text-white dark:focus:bg-gray-600">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => handleChange("birthDate", `${details.birthDate.split('-')[0]}-${value}-${details.birthDate.split('-')[2]}`)}
                  value={details.birthDate.split('-')[1]} // Mes
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700">
                    {months.map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, '0')} className="dark:text-white dark:focus:bg-gray-600">
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => handleChange("birthDate", `${details.birthDate.split('-')[0]}-${details.birthDate.split('-')[1]}-${value}`)}
                  value={details.birthDate.split('-')[2]} // Día
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Día" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700">
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString().padStart(2, '0')} className="dark:text-white dark:focus:bg-gray-600">
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select
                onValueChange={(value) => handleChange("gender", value)}
                value={details.gender}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="Masculino" className="dark:text-white dark:focus:bg-gray-600">Masculino</SelectItem>
                  <SelectItem value="Femenino" className="dark:text-white dark:focus:bg-gray-600">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select
                onValueChange={handleCountryChange}
                value={details.countryCode}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Selecciona tu país" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code} className="dark:text-white dark:focus:bg-gray-600">
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <Button 
              type="submit"
              className="w-full"
            >
              Continuar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default PilotDetailsForm;
