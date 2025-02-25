"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import Link from "next/link";

interface CreditType {
  abbreviation: string;
  name: string;
  unit: string;
}

export default function CreditTypesPage() {
  const [creditTypes, setCreditTypes] = useState<CreditType[]>([]);

  useEffect(() => {
    async function fetchCreditTypes() {
      try {
        const response = await axios.get("/api/credit-types");
        setCreditTypes(response.data.credit_types);
      } catch (error) {
        console.error("Error fetching credit types:", error);
      }
    }

    fetchCreditTypes();
  }, []);

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
        <Header />
        <h3 className="mb-4 text-lg font-semibold">Credit Types</h3>
        <Table headers={["Abbreviation", "Name", "Unit"]}>
          {creditTypes.map((creditType) => (
            <TableRow key={creditType.abbreviation}>
              <TableCell>
                <Link href={`/credit-type/${creditType.abbreviation}`}>
                  {creditType.abbreviation}
                </Link>
              </TableCell>
              <TableCell>{creditType.name}</TableCell>
              <TableCell>{creditType.unit}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}
