import axios from "axios";
import Layout from "@/components/Layout";
import { Project } from "@/utils/types";
import MetadataLink from "@/components/MetadataLink";
import CreditClassLink from "@/components/CreditClassLink";
import AddressLink from "@/components/AddressLink";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import ResolvedMetadata from "@/components/ResolvedMetadata";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import Link from "next/link";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

interface Batch {
  denom: string;
  issuance_date: string;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let { id } = params;
  let project: Project | null = null;
  let batches: Batch[] = [];
  let error: string | null = null;

  try {
    const [projectResponse, batchesResponse] = await Promise.all([
      axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/project/${id}`
      ),
      axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/batches/project/${id}`
      ),
    ]);

    project = projectResponse.data["project"];
    batches = batchesResponse.data.batches;
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <Layout>
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
          <h3 className="mt-6 text-lg font-semibold">Batches</h3>
          <Table headers={["Denom", "Issuance Date"]}>
            {batches.map((batch) => (
              <TableRow key={batch.denom}>
                <TableCell>
                  <Link href={`/batch/${batch.denom}`}>{batch.denom}</Link>
                </TableCell>
                <TableCell>{batch.issuance_date}</TableCell>
              </TableRow>
            ))}
          </Table>
          <div className="mt-6"></div>
          <ResolvedMetadata iri={project.metadata} />
        </>
      )}
    </Layout>
  );
}
