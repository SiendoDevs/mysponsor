import React from "react";
import Image from "next/image";

interface PilotFooterProps {
  contactInfo: string;
  socialLinks: { [key: string]: string };
}

const PilotFooter: React.FC<PilotFooterProps> = ({ contactInfo, socialLinks }) => {
  return (
    <div className="bg-black text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">{contactInfo}</p>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Redes Sociales</h4>
          <div className="flex justify-center space-x-6 mt-2">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/icons/${platform}.svg`}
                  alt={platform}
                  width={24} // specify the width
                  height={24} // specify the height
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotFooter;
