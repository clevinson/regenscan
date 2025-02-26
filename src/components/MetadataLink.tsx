import React from "react";

interface MetadataLinkProps {
  iri: string;
}

const MetadataLink = ({ iri }: MetadataLinkProps) => {
  return <a href={`/dataset/${iri}`}>{iri}</a>;
};

export default MetadataLink;
