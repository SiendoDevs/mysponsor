import React from "react";

interface PilotFooterProps {
  contactInfo: string;
}

const PilotFooter: React.FC<PilotFooterProps> = ({ contactInfo }) => {
  return (
    <div className="bg-black text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">{contactInfo}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-400">MySponsor© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default PilotFooter;
