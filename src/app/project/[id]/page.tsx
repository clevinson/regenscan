import axios from "axios";
import { Project } from "@/utils/types";
import React from "react";
import MetadataLink from "@/components/MetadataLink";
import CreditClassLink from "@/components/CreditClassLink";
import AddressLink from "@/components/AddressLink";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import JsonViewer from "@/components/JsonViewer";
import ResolvedMetadata from "@/components/ResolvedMetadata";
import Header from "@/components/Header";

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
      <Header />
      {project && (
        <>
          <h3 className="mb-2 text-lg font-semibold">Project: {project.id}</h3>
          <div className="text-xs max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
            <InfoTable>
              <KeyColumn>Admin:</KeyColumn>
              <ValueColumn>
                <AddressLink address={project.admin} />
              </ValueColumn>
              <KeyColumn>Credit Class:</KeyColumn>
              <ValueColumn>
                <CreditClassLink id={project.class_id} />
              </ValueColumn>
              <KeyColumn>Jurisdiction:</KeyColumn>
              <ValueColumn>{project.jurisdiction}</ValueColumn>
              <KeyColumn>Metadata:</KeyColumn>
              <ValueColumn>
                <MetadataLink iri={project.metadata} />
              </ValueColumn>
              <KeyColumn>Reference ID:</KeyColumn>
              <ValueColumn>{project.reference_id}</ValueColumn>
            </InfoTable>
          </div>
          <ResolvedMetadata iri={project.metadata} />
        </>
      )}
    </div>
  );
}
