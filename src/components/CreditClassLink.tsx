import React from "react";

interface CreditClassLinkProps {
  id: string;
}

const CreditClassLink = ({ id }: CreditClassLinkProps) => {
  return <a href={`/class/${id}`}>{id}</a>;
};

export default CreditClassLink;
