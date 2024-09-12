import { Reference } from "@/utils/types";
import React from "react";

interface ReferenceProps {
  reference: Reference;
}

const ReferenceLink = ({ reference }: ReferenceProps) => {
  let backgroundColor = "";
  let refTypeName = "";
  let href = "";

  if (reference.refType === "project") {
    backgroundColor = "bg-orange-400";
    refTypeName = "Project";
    href = `/project/${reference.id}`;
  } else if (reference.refType === "creditClass") {
    backgroundColor = "bg-green-300";
    refTypeName = "Credit Class";
    href = `/class/${reference.id}`;
  } else if (reference.refType === "creditBatch") {
    backgroundColor = "bg-cyan-400";
    refTypeName = "Credit Batch";
    href = `/batch/${reference.id}`;
  } else {
    backgroundColor = "bg-gray-400";
    refTypeName = "Reference";
    href = "#";
  }

  return (
    <a
      href={href}
      className={`inline-block px-2 py-1 border border-gray-300 rounded-xl ${backgroundColor} text-gray-600 text-xs font-semibold`}
    >
      {refTypeName}: {reference.id}
    </a>
  );
};

export default ReferenceLink;
