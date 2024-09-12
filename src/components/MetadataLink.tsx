import React from "react";

interface MetadataLinkProps {
  iri: string;
}

const MetadataLink = ({ iri }: MetadataLinkProps) => {
  return (
    <a className="text-blue-400 hover:text-blue-500" href={`/dataset/${iri}`}>
      {iri}
    </a>
  );
};

export default MetadataLink;
