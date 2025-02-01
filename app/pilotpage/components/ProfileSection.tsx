"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

interface ProfileSectionProps {
  name: string;
  location: string;
  countryCode: string;
  profileImage: string | null;
  coverImage: string | null;
  onUploadProfile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadCover: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  location,
  countryCode,
  profileImage,
  coverImage,
  onUploadProfile,
  onUploadCover,
}) => {
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative">
      {/* Cover Image Section */}
      <div className="h-[300px] w-full relative">
        {coverImage ? (
          <Image
            src={coverImage}
            alt="Cover"
            fill
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-t from-neutral-900 via-neutral-800 to-transparent" />
        )}

        {/* Gradiente de fondo */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-black/80 to-transparent" />

        {/* Button to upload cover image */}
        <Button
          variant="default"
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70"
          onClick={() => coverInputRef.current?.click()}
        >
          <Camera className="w-4 h-4 mr-2" />
          Cambiar portada
        </Button>
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          onChange={onUploadCover}
          accept="image/*"
        />
      </div>

      {/* Profile Section */}
      <div className="absolute top-[210px] left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row items-center gap-4 z-10">
        <div className="relative">
          <Avatar className="w-[176px] h-[176px] border-4 border-black rounded-full">
            <AvatarImage
              src={profileImage || ""}
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback className="bg-neutral-950 text-4xl">
              {name ? name.charAt(0) : "A"}
            </AvatarFallback>
          </Avatar>

          {/* Button to upload profile image */}
          <Button
            variant="secondary"
            className="absolute bottom-2 right-2 rounded-full p-2"
            onClick={() => profileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
          </Button>
          <input
            type="file"
            ref={profileInputRef}
            className="hidden"
            onChange={onUploadProfile}
            accept="image/*"
          />
        </div>

        <div className="flex-grow mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-white mb-2 font-racing">
            {name}
          </h1>
          <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full">
            <p className="text-xl text-gray-200">{location}</p>
            {countryCode && (
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                title={countryCode}
                className="text-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
