"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

interface PilotInfo {
  name: string;
  experience: string;
  desired_budget: number;
}

interface PilotDetails {
  birthDate: string;
  gender: string;
  location: string;
}

interface PilotPreviewProps {
  pilotInfo: PilotInfo;
  details: PilotDetails;
}

const PilotPreview: React.FC<PilotPreviewProps> = ({ pilotInfo, details }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageResult = reader.result as string;
        setProfileImage(imageResult);
        localStorage.setItem('profileImage', imageResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const age = calculateAge(details.birthDate);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black dark">
      <Card className="max-w-md w-full p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 dark:bg-black backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center space-y-6 pb-8">
          <div className="relative group">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <Avatar className="w-32 h-32 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <AvatarImage 
                  src={profileImage || ""} 
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold dark:bg-gray-700">
                  {pilotInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </label>
            <Input 
              id="profile-upload" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {pilotInfo.name}
            </CardTitle>
            <p className="text-muted-foreground">{details.location}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Experiencia</p>
              <p className="text-xl font-bold text-primary mt-1">{pilotInfo.experience} años</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Edad</p>
              <p className="text-xl font-bold text-primary mt-1">{age} años</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Género</span>
              <span className="font-medium">{details.gender}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Presupuesto</span>
              <span className="font-medium text-green-500">${pilotInfo.desired_budget.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PilotPreview;