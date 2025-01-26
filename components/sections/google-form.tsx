import React from "react";

const GoogleFormEmbed = ({ formUrl }) => {
  return (
    <div className="mx-auto size-full max-w-4xl p-4">
      <iframe
        src={formUrl}
        width="100%"
        height="100%"
        className="size-full h-[95vh] rounded-lg border-0 shadow-lg"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleFormEmbed;
