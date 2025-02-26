import axios from "axios";
import Layout from "@/components/Layout";
import { CreditClass, Project } from "@/utils/types";
import ProjectsTable from "@/components/ProjectsTable";
import MetadataLink from "@/components/MetadataLink";
import AddressLink from "@/components/AddressLink";
import SeeMore from "@/components/SeeMore";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import ResolvedMetadata from "@/components/ResolvedMetadata";
import Header from "@/components/Header";

interface CreditClassPageProps {
  params: {
    id: string;
  };
}

export default async function CreditClassPage({
  params,
}: CreditClassPageProps) {
  let { id } = params;
  let creditClass: CreditClass | null = null;
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    const [creditClassResponse, classIssuersResponse, projectsResponse] =
      await Promise.all([
        axios.get(
          `http://mainnet.regen.network:1317/regen/ecocredit/v1/class/${id}`
        ),
        axios.get(
          `http://mainnet.regen.network:1317/regen/ecocredit/v1/class-issuers/${id}`
        ),
        axios.get(
          `http://mainnet.regen.network:1317/regen/ecocredit/v1/classes/${id}/projects`
        ),
      ]);

    creditClass = creditClassResponse.data["class"];
    creditClass
      ? (creditClass.issuers = classIssuersResponse.data["issuers"])
      : null;

    projects = projectsResponse.data.projects;
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!creditClass) return <div>Loading...</div>;

  return (
    <Layout>
      {creditClass && (
        <>
          <h3 className="mb-2 text-lg font-semibold">
            Credit Class: {creditClass.id}
          </h3>
          <div className="text-xs p-4 bg-gray-50 rounded-lg border border-gray-300">
            <InfoTable>
              <KeyColumn>Credit Type:</KeyColumn>
              <ValueColumn>
                <a href={`/credit-type/${creditClass.credit_type_abbrev}`}>
                  {creditClass.credit_type_abbrev}
                </a>
              </ValueColumn>
              <KeyColumn>Admin:</KeyColumn>
              <ValueColumn>
                <AddressLink address={creditClass.admin} />
              </ValueColumn>
              <KeyColumn>Issuers:</KeyColumn>
              <ValueColumn>
                <SeeMore>
                  {creditClass.issuers.map((issuer) => {
                    return <AddressLink address={issuer} />;
                  })}
                </SeeMore>
              </ValueColumn>
              <KeyColumn>Metadata:</KeyColumn>
              <ValueColumn>
                <MetadataLink iri={creditClass.metadata} />
              </ValueColumn>
            </InfoTable>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Projects</h3>
          <p className="mb-2 text-sm text-gray-400">
            The following projects are registered with the above credit class
          </p>
          <ProjectsTable projects={projects} />
          <div className="mt-4" />
          <ResolvedMetadata iri={creditClass.metadata} />
        </>
      )}
    </Layout>
  );
}
