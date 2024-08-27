"use client";
import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface JsonViewerProps {
  payload: any;
}

const JsonViewer = ({ payload }: JsonViewerProps) => {
  return (
    <JsonView
      src={payload}
      collapsed={(params) => {
        if (params.indexOrName === "@context") return true;
        return false;
      }}
      customizeNode={(params) => {
        if (
          typeof params.node === "string" &&
          params.node.startsWith("https://")
        )
          return (
            <a
              href={params.node}
              target="_blank"
              className="text-sky-500 hover:underline"
            >
              {params.node}
            </a>
          );
      }}
    />
  );
};

export default JsonViewer;
