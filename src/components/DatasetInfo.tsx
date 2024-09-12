"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reference } from "../utils/types";
import ReferenceLink from "./ReferenceLink";
import {
  faShareSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface DatasetInfoProps {
  iri: string;
  usedIn: Array<Reference> | null;
  datasetId: string | null;
  datasetType: string | null;
  attestations: string | null;
  anchorTimestamp: string | null;
  resolvers: string[] | null;
}

const DatasetInfo: React.FC<DatasetInfoProps> = ({
  iri,
  usedIn,
  datasetId,
  datasetType,
  anchorTimestamp,
  attestations,
  resolvers,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 mb-8 transition-all ${
        isCollapsed ? "overflow-hidden" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-l">
          <h3 className="font-semibold text-gray-700 mr-2">Regen IRI</h3>
          <p className="font-medium text-blue-600 break-words">{iri}</p>
        </div>
        <button
          onClick={toggleCollapse}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
        </button>
      </div>

      {!isCollapsed && (
        <>
          {usedIn && usedIn.length > 0 && (
            <div className="mt-4 flex flex-row pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mr-2">Used In:</h3>
              <div className="flex flex-wrap">
                {usedIn.map((reference: Reference, index: number) => (
                  <ReferenceLink key={index} reference={reference} />
                ))}
              </div>
            </div>
          )}

          <div className="pt-6">
            <div className="mb-4 flex justify-between border-b border-gray-200 pb-6">
              <div className="w-1/2">
                <h3 className="text-sm w-1/2 font-semibold text-gray-700">
                  Anchor Timestamp
                </h3>
                <p className="text-base font-medium text-gray-900 mt-1">
                  {anchorTimestamp || "None"}
                </p>
              </div>

              <div className="w-1/2">
                <h3 className="text-sm font-semibold text-gray-700">
                  Attestations
                </h3>
                <p className="text-base font-medium text-gray-900 mt-1">
                  {attestations || "None"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700">Resolvers</h3>
              <div className="text-base font-medium text-gray-900 mt-1">
                {resolvers
                  ? resolvers.map((resolver: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <p>{resolver}</p>
                        <a
                          href={`${resolver}${iri}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 w-4"
                        >
                          <FontAwesomeIcon icon={faShareSquare} />
                        </a>
                      </div>
                    ))
                  : "None"}{" "}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetInfo;
