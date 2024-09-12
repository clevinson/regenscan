"use client";
import React, { useState } from "react";

interface SeeMoreProps {
  children: React.ReactNode[];
}

export default function SeeMore({ children }: SeeMoreProps) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className="space-y-1">
      {children[0]}
      {children.length > 1 && (
        <button className="ml-2 text-blue-500" onClick={toggleExpanded}>
          {expanded ? "– Show less" : "+ Show more"}
        </button>
      )}
      {expanded && children.slice(1)}
    </div>
  );
}
