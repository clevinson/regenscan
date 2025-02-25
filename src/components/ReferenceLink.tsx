import { Reference } from "@/utils/types";
import React from "react";

interface ReferenceProps {
  reference: Reference;
}

const ReferenceLink = ({ reference }: ReferenceProps) => {
  let backgroundColor = "bg-gray-300";
  let refTypeName = "";
  let href = "";

  if (reference.refType === "project") {
    refTypeName = "Project";
    href = `/project/${reference.id}`;
  } else if (reference.refType === "creditClass") {
    refTypeName = "Credit Class";
    href = `/class/${reference.id}`;
  } else if (reference.refType === "creditBatch") {
    refTypeName = "Credit Batch";
    href = `/batch/${reference.id}`;
  } else {
    refTypeName = "Reference";
    href = "#";
  }

  return (
    <a
      href={href}
      className={`inline-block px-2 py-1 border border-gray-300 rounded-xl ${backgroundColor} text-xs font-semibold`}
    >
      {refTypeName}: {reference.id}
    </a>
  );
};

export default ReferenceLink;
