import React from "react";

interface MetadataLinkProps {
  iri: string;
}

const MetadataLink = ({ iri }: MetadataLinkProps) => {
  return (
    <a
      className="truncate inline-block max-w-60 md:max-w-none"
      href={`/dataset/${iri}`}
    >
      {iri}
    </a>
  );
};

export default MetadataLink;
