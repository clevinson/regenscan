import axios from "axios";
import JsonViewer from "../../../components/JsonViewer";
import DatasetInfo from "@/components/DatasetInfo";
import { Project } from "@/utils/types";
import React from "react";
import dayjs from "dayjs";
import MetadataLink from "@/components/MetadataLink";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let { id } = params;
  let project: Project | null = null;
  let error: string | null = null;

  try {
    const projectResponse = await axios.get(
      `http://mainnet.regen.network:1317/regen/ecocredit/v1/project/${id}`
    );

    project = projectResponse.data["project"];
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {project && (
        <>
          <h3 className="mb-2 text-lg font-semibold">Project: {project.id}</h3>
          <div className="text-xs max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
            <div className="grid grid-cols-2 gap-4 w-48 ">
              <div className="font-semibold">Project ID:</div>
              <div>{project.id}</div>
              <div className="font-semibold">Admin:</div>
              <div>{project.admin}</div>
              <div className="font-semibold">Credit Class:</div>{" "}
              <div>{project.class_id}</div>
              <div className="font-semibold">Jurisdiction:</div>
              <div>{project.jurisdiction}</div>
              <div className="font-semibold">Metadata:</div>
              <MetadataLink iri={project.metadata} />
              <div className="font-semibold">Reference ID:</div>
              <div>{project.reference_id}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
