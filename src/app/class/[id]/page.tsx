import axios from "axios";
import { CreditClass } from "@/utils/types";
import React from "react";
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
  let error: string | null = null;

  try {
    const [creditClassResponse, classIssuersResponse] = await Promise.all([
      axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/class/${id}`
      ),
      axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/class-issuers/${id}`
      ),
    ]);

    creditClass = creditClassResponse.data["class"];
    creditClass
      ? (creditClass.issuers = classIssuersResponse.data["issuers"])
      : null;
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!creditClass) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header />
      {creditClass && (
        <>
          <h3 className="mb-2 text-lg font-semibold">
            Credit Class: {creditClass.id}
          </h3>
          <div className="text-xs max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
            <InfoTable>
              <KeyColumn>Credit Type:</KeyColumn>
              <ValueColumn>{creditClass.credit_type_abbrev}</ValueColumn>
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
          <ResolvedMetadata iri={creditClass.metadata} />
        </>
      )}
    </div>
  );
}
