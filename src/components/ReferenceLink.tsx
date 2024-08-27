import { Reference } from "@/utils/types";
import React from "react";

interface ReferenceProps {
  reference: Reference;
}

const ReferenceLink = ({ reference }: ReferenceProps) => {
  let backgroundColor = "";
  let refTypeName = "";

  if (reference.refType === "project") {
    backgroundColor = "bg-orange-400";
    refTypeName = "Project";
  } else if (reference.refType === "creditClass") {
    backgroundColor = "bg-green-400";
    refTypeName = "Credit Class";
  } else if (reference.refType === "creditBatch") {
    backgroundColor = "bg-cyan-400";
    refTypeName = "Credit Batch";
  } else {
    backgroundColor = "bg-gray-400";
    refTypeName = "Reference";
  }

  return (
    <a
      href={`/project/${reference.id}`}
      className={`inline-block px-2 py-1 rounded-xl ${backgroundColor} text-white text-xs font-semibold`}
    >
      {refTypeName}: {reference.id}
    </a>
  );
};

export default ReferenceLink;
