import axios from "axios";
import React from "react";
import Header from "@/components/Header";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import CreditClassesTable from "@/components/CreditClassesTable";

interface CreditTypePageProps {
  params: {
    id: string;
  };
}

export default async function CreditTypePage({ params }: CreditTypePageProps) {
  let { id } = params;
  let creditType: any | null = null;
  let creditClasses: any[] = [];
  let error: string | null = null;

  try {
    const [creditTypeResponse, creditClassesResponse] = await Promise.all([
      axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/credit-type/${id}`
      ),
      axios.get("http://mainnet.regen.network:1317/regen/ecocredit/v1/classes"),
    ]);

    creditType = creditTypeResponse.data["credit_type"];
    creditClasses = creditClassesResponse.data.classes.filter(
      (creditClass: any) =>
        creditClass.credit_type_abbrev === creditType.abbreviation
    );
  } catch (err) {
    error = "Error fetching data. Please check the ID.";
  }

  if (error) return <div>{error}</div>;
  if (!creditType) return <div>Loading...</div>;

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
        <Header />
        {creditType && (
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">
              Credit Type: {creditType.abbreviation}
            </h3>
            <div className="text-xs p-4 bg-gray-50 rounded-lg border border-gray-300">
              <InfoTable>
                <KeyColumn>Abbreviation:</KeyColumn>
                <ValueColumn>{creditType.abbreviation}</ValueColumn>
                <KeyColumn>Name:</KeyColumn>
                <ValueColumn>{creditType.name}</ValueColumn>
                <KeyColumn>Unit:</KeyColumn>
                <ValueColumn>{creditType.unit}</ValueColumn>
                <KeyColumn>Precision:</KeyColumn>
                <ValueColumn>{creditType.precision}</ValueColumn>
              </InfoTable>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Credit Classes</h3>
            <p className="mb-2 text-sm text-gray-400">
              The following credit classes are registered with the above credit
              type
            </p>
            <CreditClassesTable creditClasses={creditClasses} />
          </div>
        )}
      </div>
    </div>
  );
}
