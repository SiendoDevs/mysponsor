"use client";

// PilotPage.tsx
import React, { useEffect, useState } from "react";
import {
  Championship,
  PilotHistory,
  PilotInfo,
  PilotDetails,
} from "@/interfaces/interfacePilot";
import ProfileSection from "./components/ProfileSection";
import StatsCards from "./components/StatsCards";
import HistorySection from "./components/HistorySection";
import ChampionshipsSection from "./components/ChampionshipsSection";
import BestMomentsSection from "./components/BestMomentsSection";
import InvestmentSection from "./components/InvestmentSection";
import InvestmentModal from "@/app/components/InvestmentModal";
import ChampionshipsModal from "@/app/components/ChampionshipsModal";
import HistoryModal from "@/app/components/HistoryModal";
import SocialLinksModal from "@/app/components/AddSocial";
import PilotFooter from "./components/PilotFooter";
import BudgetCard from "./components/BudgetCard";
import Navbar from "../components/Navbar";

const PilotPage: React.FC = () => {
  const [pilotInfo, setPilotInfo] = useState<PilotInfo | null>(null);
  const [pilotDetails, setPilotDetails] = useState<PilotDetails | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [bestPhotos, setBestPhotos] = useState<string[]>([]);
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [pilotHistory, setPilotHistory] = useState<PilotHistory>({
    debutDate: "01/01/2020",
    championships: 0,
    races: 0,
    lapRecords: 0,
    podiums: 0,
    finalWins: 0,
    seriesWins: 0,
    polePositions: 0,
  });

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChampionshipModalOpen, setChampionshipModalOpen] = useState(false);
  const [editingChampionship, setEditingChampionship] =
    useState<Championship | null>(null);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isSocialLinksModalOpen, setSocialLinksModalOpen] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem("pilotInfo");
    const details = localStorage.getItem("pilotDetails");
    const savedImage = localStorage.getItem("profileImage");
    const savedCover = localStorage.getItem("coverImage");
    const savedPhotos = localStorage.getItem("bestPhotos");
    const savedChampionships = localStorage.getItem("championships");

    if (info) setPilotInfo(JSON.parse(info));
    if (details) setPilotDetails(JSON.parse(details));
    if (savedImage) setProfileImage(savedImage);
    if (savedCover) setCoverImage(savedCover);
    if (savedPhotos) setBestPhotos(JSON.parse(savedPhotos));
    if (savedChampionships) setChampionships(JSON.parse(savedChampionships));
  }, []);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (!pilotInfo || !pilotDetails) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-950 text-white">
      <Navbar />
      {/* Sección de perfil (con portada) */}
      <ProfileSection
        name={pilotInfo.name}
        location={pilotDetails.location}
        countryCode={pilotDetails.countryCode}
        profileImage={profileImage}
        coverImage={coverImage}
        onUploadProfile={(e) => {
          const files = e.target.files;
          if (files) setProfileImage(URL.createObjectURL(files[0]));
        }}
        onUploadCover={(e) => {
          const files = e.target.files;
          if (files) setCoverImage(URL.createObjectURL(files[0]));
        }}
      />

      {/* Sección de estadísticas */}
      <div className="mt-[150px]">
        <StatsCards
          age={calculateAge(pilotDetails.birthDate)}
          experience={Number(pilotInfo.experience)} // Convert to number
          onAddSocial={() => setSocialLinksModalOpen(true)}
        />
      </div>

      {/* Budget Card Section */}
      <BudgetCard desiredBudget={pilotInfo.desired_budget} />

      {/* Sección de historia del piloto */}
      <HistorySection
        pilotHistory={pilotHistory}
        onAddHistory={() => setHistoryModalOpen(true)}
      />

      {/* Sección de campeonatos */}
      <ChampionshipsSection
        championships={championships}
        onAddChampionship={() => {
          setEditingChampionship(null);
          setChampionshipModalOpen(true);
        }}
        onEditChampionship={(championship) => {
          setEditingChampionship(championship);
          setChampionshipModalOpen(true);
        }}
        onDeleteChampionship={(index) => {
          const updatedChampionships = championships.filter(
            (_, i) => i !== index
          );
          setChampionships(updatedChampionships);
          localStorage.setItem(
            "championships",
            JSON.stringify(updatedChampionships)
          );
        }}
      />

      {/* Sección de mejores momentos */}
      <BestMomentsSection
        bestPhotos={bestPhotos}
        onUpload={(e) => {
          const files = e.target.files;
          if (files)
            setBestPhotos([...bestPhotos, URL.createObjectURL(files[0])]);
        }}
        onDelete={(index) => {
          const updatedPhotos = bestPhotos.filter((_, i) => i !== index);
          setBestPhotos(updatedPhotos);
          localStorage.setItem("bestPhotos", JSON.stringify(updatedPhotos));
        }}
      />

      {/* Sección de inversión */}
      <InvestmentSection
        pilotName={pilotInfo.name}
        desiredBudget={pilotInfo.desired_budget}
        onInvest={() => setIsModalOpen(true)}
      />

      {/* Modales */}
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvest={(amount) => console.log("Inversión realizada:", amount)}
      />

      <ChampionshipsModal
        isOpen={isChampionshipModalOpen}
        onClose={() => setChampionshipModalOpen(false)}
        onConfirm={(championshipData) => {
          if (editingChampionship) {
            setChampionships((prev) =>
              prev.map((championship) =>
                championship.name === editingChampionship.name
                  ? championshipData
                  : championship
              )
            );
          } else {
            setChampionships((prev) => [...prev, championshipData]);
          }
          setChampionshipModalOpen(false);
        }}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        onConfirm={(historyData) => {
          setPilotHistory(historyData);
          setHistoryModalOpen(false);
        }}
      />

      <SocialLinksModal
        isOpen={isSocialLinksModalOpen}
        onClose={() => setSocialLinksModalOpen(false)}
        onConfirm={() => setSocialLinksModalOpen(false)}
      />

      {/* Pilot Footer */}
      <PilotFooter contactInfo={""} />
    </div>
  );
};

export default PilotPage;
