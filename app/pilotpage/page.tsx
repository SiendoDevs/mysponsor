"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactCountryFlag from "react-country-flag";
import {
  Trophy,
  Flag,
  Timer,
  Wallet,
  Star,
  Camera,
  X,
  Edit,
  Trash,
  Plus,
} from "lucide-react";
import InvestmentModal from "@/app/components/InvestmentModal";
import ChampionshipsModal from "@/app/components/ChampionshipsModal";
import HistoryModal from "@/app/components/HistoryModal";
import SocialLinksModal from "@/app/components/AddSocial";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Championship,
  PilotHistory,
  PilotInfo,
  PilotDetails,
} from "@/app/types";

const PilotPage: React.FC = () => {
  const [pilotInfo, setPilotInfo] = useState<PilotInfo | null>(null);
  const [pilotDetails, setPilotDetails] = useState<PilotDetails | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bestPhotos, setBestPhotos] = useState<string[] | null>(null); // Added state for best photos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [championships, setChampionships] = useState<Championship[]>([]); // Estado para almacenar campeonatos
  const [isChampionshipModalOpen, setChampionshipModalOpen] = useState(false);
  const [editingChampionship, setEditingChampionship] =
    useState<Championship | null>(null); // Estado para el campeonato en edición
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false); // State for HistoryModal
  const [isSocialLinksModalOpen, setSocialLinksModalOpen] = useState(false); // State for SocialLinksModal
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Explicitly type the ref

  // Datos históricos del piloto
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

  useEffect(() => {
    const info = localStorage.getItem("pilotInfo");
    const details = localStorage.getItem("pilotDetails");
    const savedImage = localStorage.getItem("profileImage");
    const savedPhotos = localStorage.getItem("bestPhotos"); // Added to fetch best photos
    const savedChampionships = localStorage.getItem("championships"); // Added to fetch championships
    if (info) setPilotInfo(JSON.parse(info));
    if (details) setPilotDetails(JSON.parse(details));
    if (savedImage) setProfileImage(savedImage);
    if (savedPhotos) setBestPhotos(JSON.parse(savedPhotos)); // Parse and set best photos
    if (savedChampionships) setChampionships(JSON.parse(savedChampionships)); // Parse and set championships
  }, []);

  const [sponsorLogos, setSponsorLogos] = useState<string[] | null>(null);
  const sponsorLogoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedSponsorLogos = localStorage.getItem("sponsorLogos");
    if (savedSponsorLogos) setSponsorLogos(JSON.parse(savedSponsorLogos));
  }, []);

  const handleSponsorLogoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const logos = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const logoResult = reader.result as string;
          setSponsorLogos((prevLogos) =>
            prevLogos ? [...prevLogos, logoResult] : [logoResult]
          );
          localStorage.setItem(
            "sponsorLogos",
            JSON.stringify(
              sponsorLogos ? [...sponsorLogos, logoResult] : [logoResult]
            )
          );
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteSponsorLogo = (index: number) => {
    const updatedLogos = sponsorLogos
      ? sponsorLogos.filter((_, i) => i !== index)
      : [];
    setSponsorLogos(updatedLogos);
    localStorage.setItem("sponsorLogos", JSON.stringify(updatedLogos));
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (!pilotInfo || !pilotDetails) return <div>Cargando...</div>;

  const age = calculateAge(pilotDetails.birthDate);

  const handleInvest = (amount: number) => {
    console.log("Inversión realizada:", amount);
    // Aquí puedes manejar la lógica de inversión
  };

  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = bestPhotos
      ? bestPhotos.filter((_, i) => i !== index)
      : [];
    setBestPhotos(updatedPhotos);
    localStorage.setItem("bestPhotos", JSON.stringify(updatedPhotos));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const images = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageResult = reader.result as string;
          setBestPhotos((prevPhotos) =>
            prevPhotos ? [...prevPhotos, imageResult] : [imageResult]
          );
          localStorage.setItem(
            "bestPhotos",
            JSON.stringify(
              bestPhotos ? [...bestPhotos, imageResult] : [imageResult]
            )
          );
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddChampionship = () => {
    setEditingChampionship(null);
    setChampionshipModalOpen(true);
  };

  const handleCloseChampionshipModal = () => {
    setChampionshipModalOpen(false);
  };

  const handleConfirmChampionship = (championshipData: Championship) => {
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
    handleCloseChampionshipModal();
  };

  const handleEditChampionship = (championship: Championship) => {
    setEditingChampionship(championship);
    setChampionshipModalOpen(true);
  };

  const handleDeleteChampionship = (index: number) => {
    const updatedChampionships = championships.filter((_, i) => i !== index);
    setChampionships(updatedChampionships);
    localStorage.setItem("championships", JSON.stringify(updatedChampionships));
  };

  // Handle adding historical data
  const handleAddHistoryData = (historyData: PilotHistory) => {
    setPilotHistory(historyData);
    setHistoryModalOpen(false);
  };

  // Handle adding social links
  const handleAddSocialLinks = (links: {
    instagram: string;
    tiktok: string;
    youtube: string;
  }) => {
    setSocialLinks(links);
    setSocialLinksModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-950 p-6 text-white">
      <div className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
        <div className="bg-gradient-to-r from-black to-neutral-950 p-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-neutral-950">
              <AvatarImage
                src={profileImage || ""}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="bg-neutral-950 text-xl">
                {pilotInfo.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-2 font-racing">
                {pilotInfo.name}
              </h1>
              <div className="flex items-center gap-3 bg-black/30 py-2 rounded-full mb-2">
                <p className="text-xl text-gray-200">{pilotDetails.location}</p>
                {pilotDetails.countryCode && (
                  <ReactCountryFlag
                    countryCode={pilotDetails.countryCode}
                    svg
                    title={pilotDetails.countryCode}
                    className="text-2xl"
                  />
                )}
              </div>
              {/* Sponsor Logos Section */}
              <div className="flex items-center gap-3">
                {!sponsorLogos || sponsorLogos.length === 0 ? (
                  <p className="text-gray-400 text-sm">Agregar Sponsors</p>
                ) : null}

                {sponsorLogos &&
                  sponsorLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="relative bg-white rounded-lg p-2 max-w-[80px] max-h-[40px] flex items-center justify-center"
                    > 
                      <Image
                        src={logo}
                        alt={`Sponsor Logo ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                      <button
                        onClick={() => handleDeleteSponsorLogo(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => sponsorLogoInputRef.current?.click()}
                  className="text-white hover:bg-white/20"
                >
                  <Plus className="w-5 h-5" />
                </Button>
                <input
                  type="file"
                  ref={sponsorLogoInputRef}
                  style={{ display: "none" }}
                  onChange={handleSponsorLogoUpload}
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-950 rounded-xl p-6 backdrop-blur flex items-center gap-4">
            <Timer className="w-8 h-8 text-zinc-200" />
            <div>
              <p className="text-gray-400">Edad</p>
              <p className="text-2xl font-bold">{age} años</p>
            </div>
          </div>
          <div className="bg-neutral-950 rounded-xl p-6 backdrop-blur flex items-center gap-4">
            <Flag className="w-8 h-8 text-zinc-200" />
            <div>
              <p className="text-gray-400">Experiencia</p>
              <p className="text-2xl font-bold">{pilotInfo.experience} año/s</p>
            </div>
          </div>
          <div className="bg-neutral-950 rounded-xl p-6 backdrop-blur flex items-center gap-4">
            <Star className="w-8 h-8 text-zinc-200" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-gray-400">MySponsor Social Rank</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calculamos en base a tus seguidores en redes sociales</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="default"
              onClick={() => setSocialLinksModalOpen(true)}
            >
              Añadir redes sociales
            </Button>
          </div>
        </div>
      </div>

      <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <div>Datos Históricos</div>
            <Button variant="default" onClick={() => setHistoryModalOpen(true)}>
              <Plus className="w-5 h-5" />
              Agregar Datos
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-neutral-950 p-4 rounded-lg">
              <p className="text-lg text-white">Debut</p>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.debutDate}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg  text-white">Campeonatos</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.championships}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Carreras</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.races}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Récords de vuelta</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.lapRecords}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Podios</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.podiums}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Victorias en finales</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.finalWins}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Victorias en series</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.seriesWins}
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg">
              <h3 className="text-lg text-white">Pole position</h3>
              <p className="text-2xl font-bold text-white">
                {pilotHistory.polePositions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <div>Historial de Campeonatos</div>
            <Button variant="default" onClick={handleAddChampionship}>
              <Trophy className="w-6 h-6 mr-2" />
              Agregar Campeonato
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableCell className="font-bold text-center text-white">
                  Nombre
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Año
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Categoría
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Posición
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Puntos
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Mejor Resultado
                </TableCell>
                <TableCell className="font-bold text-center text-white">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {championships.map((championship, index) => (
                <TableRow key={index} className="border-gray-700">
                  <TableCell className="text-center text-white">
                    {championship.name}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {championship.year}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {championship.category}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {championship.position}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {championship.points}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {championship.bestResult}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditChampionship(championship)}
                    >
                      <Edit className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteChampionship(index)}
                    >
                      <Trash className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden mb-8 border border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <div>Mis Mejores Momentos</div>
            <Button
              variant="default"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-6 h-6 mr-2" />
              Subir Fotos
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
              multiple
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {bestPhotos && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {bestPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                  <button
                    onClick={() => handleDeletePhoto(index)}
                    className="absolute top-0 right-0 m-2 bg-red-500 text-white p-2 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-screen-xl mx-auto bg-black backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-center mb-6 border border-gray-700">
        <Wallet className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-regular text-white mb-4">
          ¡Invierte en el Futuro!
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Apoya a {pilotInfo.name} en su carrera deportiva con una inversión
          desde $10,000 pesos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" onClick={() => setIsModalOpen(true)}>
            Invertir desde ${(pilotInfo.desired_budget / 10).toLocaleString()}
          </Button>
        </div>
      </div>

      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvest={handleInvest}
      />

      <ChampionshipsModal
        isOpen={isChampionshipModalOpen}
        onClose={handleCloseChampionshipModal}
        onConfirm={handleConfirmChampionship}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        onConfirm={handleAddHistoryData}
        initialData={pilotHistory} // Pass the current history data for editing
      />

      <SocialLinksModal
        isOpen={isSocialLinksModalOpen}
        onClose={() => setSocialLinksModalOpen(false)}
        onConfirm={handleAddSocialLinks}
        initialData={{ instagram: "", tiktok: "", youtube: "" }} // Pass initial data if needed
      />

      {/* Display average followers */}
      <div className="mt-4">
      </div>
    </div>
  );
};

export default PilotPage;

function setSocialLinks(links: {
  instagram: string;
  tiktok: string;
  youtube: string;
}) {
  throw new Error("Function not implemented.");
}
