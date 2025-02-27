"use client";
import React, { useState } from "react";

interface SeeMoreProps {
  children: React.ReactNode[];
}

export default function SeeMore({ children }: SeeMoreProps) {
  const [expanded, setExpanded] = useState(false);

  function Button({ className }) {
    return (
      <button
        className={className + " ml-2 text-accent-blue"}
        onClick={toggleExpanded}
      >
        {expanded ? "– Show less" : "+ Show more"}
      </button>
    );
  }

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className="space-y-1">
      {children[0]}
      {children.length > 1 && <Button className="hidden md:inline" />}
      {expanded && children.slice(1)}
      {children.length > 1 && <Button className="inline md:hidden" />}
    </div>
  );
}
