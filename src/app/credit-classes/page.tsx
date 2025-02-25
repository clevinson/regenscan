"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import CreditClassesTable from "@/components/CreditClassesTable";

interface CreditClass {
  id: string;
  metadata: string;
}

export default function CreditClassesPage() {
  const [creditClasses, setCreditClasses] = useState<CreditClass[]>([]);

  useEffect(() => {
    async function fetchCreditClasses() {
      try {
        const response = await axios.get(
          "http://mainnet.regen.network:1317/regen/ecocredit/v1/classes"
        );
        setCreditClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching credit classes:", error);
      }
    }

    fetchCreditClasses();
  }, []);

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
        <Header />
        <h3 className="mb-2 text-lg font-semibold">Credit Classes</h3>
        <p className="mb-2 text-sm text-gray-400">
          Credit Classes are highest level of abstraction in Regen Network's
          ecocrediting framework. Each credit class represents a single protocol
          for issuance and verification of a particular type of quantifiable
          ecological impact (like carbon sequestration or improvements to
          biodiversity).
        </p>
        <CreditClassesTable creditClasses={creditClasses} />
      </div>
    </div>
  );
}
