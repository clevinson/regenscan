import React from "react";

interface CreditClassLinkProps {
  id: string;
}

const CreditClassLink = ({ id }: CreditClassLinkProps) => {
  return (
    <a className="text-blue-400" href={`/class/${id}`}>
      {id}
    </a>
  );
};

export default CreditClassLink;
