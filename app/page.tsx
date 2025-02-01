"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import EvaluationForm from "./components/EvaluationForm";
import PilotDetailsForm from "./components/PilotDetailsForm";
import BudgetDistribution from "./components/BudgetDistribution";
import PilotPreview from "./components/PilotPreview";
import { Button } from "@/components/ui/button";
import { PilotDetails, PilotInfo } from "@/app/types";

const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pilotDetails, setPilotDetails] = useState<PilotDetails>({
    age: 0,
    gender: "",
    location: "",
    birthDate: "",
    countryCode: "",
  });
  const [pilotInfo, setPilotInfo] = useState<PilotInfo>({
    firstName: "",
    lastName: "",
    nickName: "",
    experience: "",
    desired_budget: 0,
    name: "",
  });

  const router = useRouter();

  useEffect(() => {
    const savedDetails = localStorage.getItem("pilotDetails");
    if (savedDetails) {
      setPilotDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleFormSubmit = (formData: PilotInfo) => {
    // Ensure 'name' is constructed from 'firstName' and 'lastName'
    const updatedFormData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`, // Concatenate 'firstName' and 'lastName' for 'name'
    };

    setPilotInfo(updatedFormData); // Save the updated data
    setCurrentStep(2); // Move to the next step
  };

  const handleDetailsSubmit = (details: PilotDetails) => {
    setPilotDetails(details);
    setCurrentStep(3);
  };

  const handleQuestionAnswer = (hasCompeted: boolean) => {
    setPilotInfo(prev => ({
      ...prev,
      experience: hasCompeted ? "Experimentado" : "Principiante"
    }));
    setCurrentStep(1);
  };

  const createProfile = () => {
    localStorage.setItem('pilotInfo', JSON.stringify({
      name: `${pilotInfo.firstName} ${pilotInfo.lastName} (${pilotInfo.nickName})`,
      experience: pilotInfo.experience,
      desired_budget: pilotInfo.desired_budget,
    }));
    localStorage.setItem('pilotDetails', JSON.stringify(pilotDetails));
    router.push('/pilotpage');
  };

  return (
    <div className="bg-black text-gray-300">
      {currentStep === 0 && <Welcome />}
      {currentStep === 1 && (
        <EvaluationForm
          onFormSubmit={handleFormSubmit}
          initialData={pilotInfo}
        />
      )}
      {currentStep === 2 && (
        <PilotDetailsForm
          onSubmit={handleDetailsSubmit}
          initialData={pilotDetails}
        />
      )}
      {currentStep === 3 && (
        <BudgetDistribution desired_budget={pilotInfo.desired_budget} />
      )}
      {currentStep === 4 && (
        <>
          <PilotPreview
            pilotInfo={{
              name: `${pilotInfo.firstName} ${pilotInfo.lastName} (${pilotInfo.nickName})`,
              experience: pilotInfo.experience,
              desired_budget: pilotInfo.desired_budget,
            }}
            details={pilotDetails}
          />
          <Button onClick={createProfile} className="fixed bottom-4 right-4">
            Crear Perfil de MySponsor
          </Button>
        </>
      )}

      {currentStep === 0 && (
        <Button
          onClick={() => setCurrentStep(5)}
          className="fixed bottom-4 right-4"
        >
          Comenzar
        </Button>
      )}

      {currentStep === 5 && (
        <Question onAnswer={handleQuestionAnswer} />
      )}

      {currentStep === 2 && (
        <Button
          onClick={() => setCurrentStep(1)}
          className="fixed bottom-4 left-4"
        >
          Volver
        </Button>
      )}

      {currentStep === 3 && (
        <>
          <Button
            onClick={() => setCurrentStep(2)}
            className="fixed bottom-4 left-4"
          >
            Volver
          </Button>
          <Button
            onClick={() => setCurrentStep(4)}
            className="fixed bottom-4 right-4"
            disabled={!pilotInfo.desired_budget || pilotDetails.age === 0 || !pilotDetails.birthDate || !pilotDetails.countryCode}
          >
            Siguiente
          </Button>
        </>
      )}

      {currentStep === 4 && (
        <Button
          onClick={() => setCurrentStep(3)}
          className="fixed bottom-4 left-4"
        >
          Volver
        </Button>
      )}
    </div>
  );
};

export default HomePage;