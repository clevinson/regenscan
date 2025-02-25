import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function TestIconsPage() {
  return (
    <div className="h-screen flex items-center justify-center space-x-10">
      <div className="flex flex-col items-center">
        <h2 className="mb-4">From CDN</h2>
        <FontAwesomeIcon icon={faQuestionCircle} className="text-sm" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="mb-4">Self-hosted</h2>
      </div>
    </div>
  );
}
