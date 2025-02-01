"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CoverSectionProps {
  coverImage: string | null;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoverSection: React.FC<CoverSectionProps> = ({ coverImage, onUpload }) => {
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative">
      <div className="h-[300px] w-full relative">
        {coverImage ? (
          <Image src={coverImage} alt="Cover" fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-neutral-900 to-neutral-800" />
        )}
        <Button
          variant="secondary"
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
          onChange={onUpload}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default CoverSection;
