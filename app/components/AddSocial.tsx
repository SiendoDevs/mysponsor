"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SocialLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (socialLinks: { instagram: string; tiktok: string; youtube: string }) => void;
  initialData?: { instagram: string; tiktok: string; youtube: string }; // Optional initial data for editing
}

const SocialLinksModal: React.FC<SocialLinksModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
}) => {
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    if (initialData) {
      setInstagram(initialData.instagram);
      setTiktok(initialData.tiktok);
      setYoutube(initialData.youtube);
    }
  }, [initialData]);

  const handleConfirm = () => {
    const socialLinks = {
      instagram,
      tiktok,
      youtube,
    };
    onConfirm(socialLinks);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? null : onClose()}>
      <DialogContent aria-describedby="social-links-modal-description">
        <DialogHeader>
          <DialogTitle>Agregar Redes Sociales</DialogTitle>
          <DialogDescription>
            Ingrese las URLs de sus redes sociales.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
          <input
            type="url"
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://instagram.com/yourprofile"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">TikTok</label>
          <input
            type="url"
            id="tiktok"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://tiktok.com/@yourprofile"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">YouTube</label>
          <input
            type="url"
            id="youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://youtube.com/c/yourchannel"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksModal;
